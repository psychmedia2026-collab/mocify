BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE account_type AS ENUM ('LISTENER','ARTIST','BUSINESS','ADMIN');
CREATE TYPE account_status AS ENUM ('PENDING','ACTIVE','SUSPENDED','DELETED');
CREATE TYPE admin_role AS ENUM ('SUPER_ADMIN','SECURITY_ADMIN','FINANCE_ADMIN','MODERATOR','SUPPORT');
CREATE TYPE artist_plan AS ENUM ('ARTIST_FREE','ARTIST_PRO','ARTIST_MAX');
CREATE TYPE record_status AS ENUM ('PENDING','ACTIVE','PAUSED','BLOCKED','FAILED','COMPLETED','CANCELLED');
CREATE TYPE risk_status AS ENUM ('OPEN','REVIEWING','RESOLVED');

CREATE TABLE public_id_counters (
  namespace varchar(8) PRIMARY KEY,
  last_value bigint NOT NULL DEFAULT 0 CHECK (last_value >= 0)
);

CREATE OR REPLACE FUNCTION next_public_id(ns varchar, pad_width integer DEFAULT 6)
RETURNS varchar LANGUAGE plpgsql AS $$
DECLARE n bigint;
BEGIN
  INSERT INTO public_id_counters(namespace,last_value) VALUES (upper(ns),1)
  ON CONFLICT(namespace) DO UPDATE SET last_value=public_id_counters.last_value+1
  RETURNING last_value INTO n;
  RETURN upper(ns) || '-' || lpad(n::text,pad_width,'0');
END $$;

CREATE TABLE accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  type account_type NOT NULL,
  email varchar(320) NOT NULL,
  status account_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT accounts_email_ci_unique UNIQUE (email)
);

CREATE TABLE admin_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id),
  role admin_role NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(account_id,role)
);

CREATE TABLE artist_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  account_id uuid NOT NULL UNIQUE REFERENCES accounts(id),
  display_name varchar(160) NOT NULL,
  legal_name varchar(240),
  country_code char(2),
  plan artist_plan NOT NULL DEFAULT 'ARTIST_FREE',
  verification_status record_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  account_id uuid NOT NULL UNIQUE REFERENCES accounts(id),
  legal_name varchar(240) NOT NULL,
  country_code char(2),
  verification_status record_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  artist_id uuid NOT NULL REFERENCES artist_profiles(id),
  title varchar(240) NOT NULL,
  status record_status NOT NULL DEFAULT 'PENDING',
  licensing_opt_in boolean NOT NULL DEFAULT false,
  licensing_terms_version varchar(40),
  licensing_consented_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tracks_artist_idx ON tracks(artist_id);

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id),
  plan_code varchar(80) NOT NULL,
  status record_status NOT NULL DEFAULT 'ACTIVE',
  starts_at timestamptz NOT NULL DEFAULT now(),
  renews_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX subscriptions_account_idx ON subscriptions(account_id);

CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  account_id uuid NOT NULL REFERENCES accounts(id),
  provider varchar(80),
  provider_reference varchar(255),
  idempotency_key varchar(255) UNIQUE,
  amount_minor bigint NOT NULL CHECK(amount_minor >= 0),
  currency char(3) NOT NULL DEFAULT 'EUR',
  status record_status NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  settled_at timestamptz
);
CREATE INDEX payments_account_idx ON payments(account_id);

CREATE TABLE payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  artist_id uuid NOT NULL REFERENCES artist_profiles(id),
  amount_minor bigint NOT NULL CHECK(amount_minor >= 0),
  currency char(3) NOT NULL DEFAULT 'EUR',
  status record_status NOT NULL DEFAULT 'PENDING',
  destination_token varchar(255),
  created_at timestamptz NOT NULL DEFAULT now(),
  executed_at timestamptz
);
CREATE INDEX payouts_artist_idx ON payouts(artist_id);

CREATE TABLE licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  business_id uuid NOT NULL REFERENCES business_profiles(id),
  track_id uuid NOT NULL REFERENCES tracks(id),
  status record_status NOT NULL DEFAULT 'PENDING',
  usage_type varchar(120) NOT NULL,
  territory varchar(120),
  starts_at timestamptz,
  ends_at timestamptz,
  amount_minor bigint CHECK(amount_minor >= 0),
  currency char(3) DEFAULT 'EUR',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX licenses_track_idx ON licenses(track_id);
CREATE INDEX licenses_business_idx ON licenses(business_id);

CREATE TABLE risk_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  artist_id uuid REFERENCES artist_profiles(id),
  track_id uuid REFERENCES tracks(id),
  payout_id uuid REFERENCES payouts(id),
  status risk_status NOT NULL DEFAULT 'OPEN',
  score integer NOT NULL DEFAULT 0 CHECK(score BETWEEN 0 AND 100),
  temporary_hold boolean NOT NULL DEFAULT false,
  assigned_admin_id uuid REFERENCES accounts(id),
  opened_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolution text
);
CREATE INDEX risk_artist_idx ON risk_cases(artist_id);
CREATE INDEX risk_track_idx ON risk_cases(track_id);

CREATE TABLE risk_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  risk_case_id uuid NOT NULL REFERENCES risk_cases(id) ON DELETE CASCADE,
  code varchar(100) NOT NULL,
  score_delta integer NOT NULL DEFAULT 0,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  actor_account_id uuid REFERENCES accounts(id),
  action varchar(160) NOT NULL,
  entity_type varchar(80) NOT NULL,
  entity_public_id varchar(32),
  request_id uuid,
  ip_hash varchar(128),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  previous_hash varchar(128),
  event_hash varchar(128) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_entity_idx ON audit_events(entity_type,entity_public_id);
CREATE INDEX audit_created_idx ON audit_events(created_at DESC);

CREATE TABLE system_controls (
  key varchar(100) PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT true,
  changed_by uuid REFERENCES accounts(id),
  reason text,
  changed_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO system_controls(key,enabled,reason) VALUES
('platform.mocify',true,'Initial backend foundation'),
('platform.business',true,'Initial backend foundation'),
('feature.uploads',true,'Initial backend foundation'),
('finance.collections',true,'Initial backend foundation'),
('finance.payouts',true,'Initial backend foundation'),
('security.emergency_lockdown',false,'Initial backend foundation');

COMMIT;
