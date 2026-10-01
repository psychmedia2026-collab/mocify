BEGIN;

-- Public IDs are generated inside PostgreSQL so concurrent requests cannot issue duplicates.
CREATE OR REPLACE FUNCTION assign_account_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.public_id IS NULL OR btrim(NEW.public_id) = '' THEN
    NEW.public_id := next_public_id(CASE NEW.type
      WHEN 'LISTENER' THEN 'LST'
      WHEN 'ARTIST' THEN 'ACC'
      WHEN 'BUSINESS' THEN 'BUSACC'
      WHEN 'ADMIN' THEN 'ADM'
    END);
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS accounts_public_id_trigger ON accounts;
CREATE TRIGGER accounts_public_id_trigger BEFORE INSERT ON accounts
FOR EACH ROW EXECUTE FUNCTION assign_account_public_id();

CREATE OR REPLACE FUNCTION assign_artist_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.public_id IS NULL OR btrim(NEW.public_id) = '' THEN NEW.public_id := next_public_id('ART'); END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS artist_public_id_trigger ON artist_profiles;
CREATE TRIGGER artist_public_id_trigger BEFORE INSERT ON artist_profiles
FOR EACH ROW EXECUTE FUNCTION assign_artist_public_id();

CREATE OR REPLACE FUNCTION assign_track_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.public_id IS NULL OR btrim(NEW.public_id) = '' THEN NEW.public_id := next_public_id('TRK'); END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS track_public_id_trigger ON tracks;
CREATE TRIGGER track_public_id_trigger BEFORE INSERT ON tracks
FOR EACH ROW EXECUTE FUNCTION assign_track_public_id();

CREATE OR REPLACE FUNCTION assign_business_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.public_id IS NULL OR btrim(NEW.public_id) = '' THEN NEW.public_id := next_public_id('BUS'); END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS business_public_id_trigger ON business_profiles;
CREATE TRIGGER business_public_id_trigger BEFORE INSERT ON business_profiles
FOR EACH ROW EXECUTE FUNCTION assign_business_public_id();

CREATE OR REPLACE FUNCTION assign_payment_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('PAY'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS payment_public_id_trigger ON payments;
CREATE TRIGGER payment_public_id_trigger BEFORE INSERT ON payments FOR EACH ROW EXECUTE FUNCTION assign_payment_public_id();

CREATE OR REPLACE FUNCTION assign_payout_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('OUT'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS payout_public_id_trigger ON payouts;
CREATE TRIGGER payout_public_id_trigger BEFORE INSERT ON payouts FOR EACH ROW EXECUTE FUNCTION assign_payout_public_id();

CREATE OR REPLACE FUNCTION assign_license_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('LIC'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS license_public_id_trigger ON licenses;
CREATE TRIGGER license_public_id_trigger BEFORE INSERT ON licenses FOR EACH ROW EXECUTE FUNCTION assign_license_public_id();

CREATE OR REPLACE FUNCTION assign_risk_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('RC'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS risk_public_id_trigger ON risk_cases;
CREATE TRIGGER risk_public_id_trigger BEFORE INSERT ON risk_cases FOR EACH ROW EXECUTE FUNCTION assign_risk_public_id();

CREATE OR REPLACE FUNCTION assign_audit_public_id()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('AUD'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS audit_public_id_trigger ON audit_events;
CREATE TRIGGER audit_public_id_trigger BEFORE INSERT ON audit_events FOR EACH ROW EXECUTE FUNCTION assign_audit_public_id();

-- Basic authentication/session storage. Tokens must be stored as hashes, never plaintext.
CREATE TABLE IF NOT EXISTS account_credentials (
  account_id uuid PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
  password_hash text,
  email_verified_at timestamptz,
  failed_login_count integer NOT NULL DEFAULT 0 CHECK(failed_login_count >= 0),
  locked_until timestamptz,
  password_changed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  token_hash varchar(128) NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS auth_sessions_account_idx ON auth_sessions(account_id);
CREATE INDEX IF NOT EXISTS auth_sessions_active_idx ON auth_sessions(expires_at) WHERE revoked_at IS NULL;

-- Stream ledger is append-only source data; aggregate counts are derived from it.
CREATE TABLE IF NOT EXISTS stream_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  listener_account_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  session_key_hash varchar(128),
  played_at timestamptz NOT NULL DEFAULT now(),
  duration_seconds integer NOT NULL DEFAULT 0 CHECK(duration_seconds >= 0),
  counted boolean NOT NULL DEFAULT true,
  country_code char(2),
  source varchar(80),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS stream_events_track_time_idx ON stream_events(track_id, played_at DESC);
CREATE INDEX IF NOT EXISTS stream_events_listener_time_idx ON stream_events(listener_account_id, played_at DESC);

-- Keep updated_at trustworthy server-side.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at := now(); RETURN NEW; END $$;
DROP TRIGGER IF EXISTS accounts_updated_at_trigger ON accounts;
CREATE TRIGGER accounts_updated_at_trigger BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS artists_updated_at_trigger ON artist_profiles;
CREATE TRIGGER artists_updated_at_trigger BEFORE UPDATE ON artist_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS tracks_updated_at_trigger ON tracks;
CREATE TRIGGER tracks_updated_at_trigger BEFORE UPDATE ON tracks FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Read model used by Admin Artists.
CREATE OR REPLACE VIEW admin_artist_directory AS
SELECT
  ap.id,
  ap.public_id AS artist_id,
  ap.display_name,
  a.email,
  ap.plan,
  ap.verification_status,
  a.status AS account_status,
  ap.country_code,
  ap.created_at,
  COUNT(DISTINCT t.id)::bigint AS track_count,
  COUNT(se.id) FILTER (WHERE se.counted)::bigint AS total_streams
FROM artist_profiles ap
JOIN accounts a ON a.id = ap.account_id
LEFT JOIN tracks t ON t.artist_id = ap.id
LEFT JOIN stream_events se ON se.track_id = t.id
GROUP BY ap.id, ap.public_id, ap.display_name, a.email, ap.plan, ap.verification_status, a.status, ap.country_code, ap.created_at;

-- Atomic artist creation; account + profile either both succeed or neither does.
CREATE OR REPLACE FUNCTION create_artist_account(
  p_email varchar,
  p_display_name varchar,
  p_plan artist_plan DEFAULT 'ARTIST_FREE',
  p_country_code char(2) DEFAULT NULL
) RETURNS TABLE(account_public_id varchar, artist_public_id varchar)
LANGUAGE plpgsql AS $$
DECLARE v_account_id uuid; v_account_public_id varchar; v_artist_public_id varchar;
BEGIN
  INSERT INTO accounts(public_id,type,email,status)
  VALUES (NULL,'ARTIST',lower(btrim(p_email)),'ACTIVE')
  RETURNING id, public_id INTO v_account_id, v_account_public_id;

  INSERT INTO artist_profiles(public_id,account_id,display_name,country_code,plan)
  VALUES (NULL,v_account_id,btrim(p_display_name),upper(p_country_code),p_plan)
  RETURNING public_id INTO v_artist_public_id;

  RETURN QUERY SELECT v_account_public_id, v_artist_public_id;
END $$;

COMMIT;
