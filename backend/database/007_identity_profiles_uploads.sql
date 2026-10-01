BEGIN;

ALTER TABLE accounts ADD COLUMN IF NOT EXISTS password_hash text;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS email_verified_at timestamptz;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS username varchar(60);
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS locale varchar(12) NOT NULL DEFAULT 'nl-NL';
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS country_code char(2);
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS onboarding_status varchar(30) NOT NULL DEFAULT 'STARTED';
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS profile_complete boolean NOT NULL DEFAULT false;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS last_login_at timestamptz;
CREATE UNIQUE INDEX IF NOT EXISTS accounts_username_ci_unique ON accounts(lower(username)) WHERE username IS NOT NULL;

CREATE TABLE IF NOT EXISTS account_profiles(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),account_id uuid NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,display_name varchar(160),avatar_url text,bio text,language_code varchar(12) DEFAULT 'nl-NL',privacy jsonb NOT NULL DEFAULT '{"profile":"public","activity":"private"}'::jsonb,settings jsonb NOT NULL DEFAULT '{}'::jsonb,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS auth_sessions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,token_hash varchar(128) NOT NULL UNIQUE,expires_at timestamptz NOT NULL,last_seen_at timestamptz NOT NULL DEFAULT now(),revoked_at timestamptz,created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS auth_sessions_account_idx ON auth_sessions(account_id,expires_at DESC);
CREATE TABLE IF NOT EXISTS auth_tokens(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,purpose varchar(40) NOT NULL CHECK(purpose IN ('VERIFY_EMAIL','RESET_PASSWORD','CHANGE_EMAIL')),token_hash varchar(128) NOT NULL UNIQUE,new_email varchar(320),expires_at timestamptz NOT NULL,used_at timestamptz,created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS auth_tokens_account_idx ON auth_tokens(account_id,purpose,expires_at DESC);
CREATE TABLE IF NOT EXISTS auth_attempts(id bigserial PRIMARY KEY,email_hash varchar(128) NOT NULL,ip_hash varchar(128),success boolean NOT NULL,attempted_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS auth_attempts_rate_idx ON auth_attempts(email_hash,attempted_at DESC);
CREATE TABLE IF NOT EXISTS email_outbox(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),account_id uuid REFERENCES accounts(id) ON DELETE SET NULL,template varchar(80) NOT NULL,to_email varchar(320) NOT NULL,payload jsonb NOT NULL DEFAULT '{}'::jsonb,status varchar(20) NOT NULL DEFAULT 'PENDING',attempts integer NOT NULL DEFAULT 0,last_error text,created_at timestamptz NOT NULL DEFAULT now(),sent_at timestamptz);
CREATE INDEX IF NOT EXISTS email_outbox_pending_idx ON email_outbox(status,created_at);

ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS banner_url text;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS website_url text;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS social_links jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS payout_profile jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS rights_profile jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE artist_profiles ADD COLUMN IF NOT EXISTS upload_enabled boolean NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS media_assets(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),public_id varchar(32) NOT NULL UNIQUE,owner_account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,kind varchar(30) NOT NULL CHECK(kind IN ('AUDIO','COVER','AVATAR','BANNER')),storage_provider varchar(40) NOT NULL DEFAULT 'LOCAL_DEV',storage_key text NOT NULL,mime_type varchar(120) NOT NULL,size_bytes bigint NOT NULL CHECK(size_bytes>=0),sha256 varchar(64),status varchar(30) NOT NULL DEFAULT 'UPLOADED',created_at timestamptz NOT NULL DEFAULT now());
CREATE OR REPLACE FUNCTION assign_media_public_id() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('MED'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS media_public_id_trigger ON media_assets;
CREATE TRIGGER media_public_id_trigger BEFORE INSERT ON media_assets FOR EACH ROW EXECUTE FUNCTION assign_media_public_id();

ALTER TABLE tracks ADD COLUMN IF NOT EXISTS audio_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS cover_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS genre varchar(80);
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS language_code varchar(12);
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS processing_status varchar(30) NOT NULL DEFAULT 'DRAFT';
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

CREATE TABLE IF NOT EXISTS upload_jobs(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),public_id varchar(32) NOT NULL UNIQUE,account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,artist_id uuid REFERENCES artist_profiles(id) ON DELETE CASCADE,track_id uuid REFERENCES tracks(id) ON DELETE SET NULL,status varchar(30) NOT NULL DEFAULT 'CREATED',audio_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,cover_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,error text,metadata jsonb NOT NULL DEFAULT '{}'::jsonb,created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now());
CREATE OR REPLACE FUNCTION assign_upload_public_id() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('UPL'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS upload_public_id_trigger ON upload_jobs;
CREATE TRIGGER upload_public_id_trigger BEFORE INSERT ON upload_jobs FOR EACH ROW EXECUTE FUNCTION assign_upload_public_id();

CREATE OR REPLACE VIEW account_identity_directory AS SELECT a.public_id account_id,a.type,a.email,a.status,a.email_verified_at,a.username,a.locale,a.country_code,a.onboarding_status,a.profile_complete,a.last_login_at,ap.display_name,ap.avatar_url,ap.language_code,ap.privacy,ap.settings FROM accounts a LEFT JOIN account_profiles ap ON ap.account_id=a.id;
CREATE OR REPLACE VIEW artist_backend_directory AS SELECT ar.public_id artist_id,a.public_id account_id,a.email,a.status account_status,ar.display_name,ar.legal_name,ar.country_code,ar.plan,ar.verification_status,ar.bio,ar.avatar_url,ar.banner_url,ar.website_url,ar.social_links,ar.upload_enabled,COALESCE(ab.available_minor,0) available_minor,COALESCE(ab.pending_minor,0) pending_minor,COALESCE(ab.currency,'EUR') currency FROM artist_profiles ar JOIN accounts a ON a.id=ar.account_id LEFT JOIN artist_balances ab ON ab.artist_id=ar.id;

COMMIT;
