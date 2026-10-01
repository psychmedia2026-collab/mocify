BEGIN;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS pending_email varchar(320);
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS suspended_reason text;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS suspended_at timestamptz;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS deletion_requested_at timestamptz;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS phone_e164 varchar(32);
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS phone_verified_at timestamptz;

CREATE TABLE IF NOT EXISTS account_consents(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,consent_key varchar(80) NOT NULL,granted boolean NOT NULL,version varchar(40),recorded_at timestamptz NOT NULL DEFAULT now(),UNIQUE(account_id,consent_key));
CREATE TABLE IF NOT EXISTS external_identities(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,provider varchar(30) NOT NULL CHECK(provider IN ('GOOGLE','APPLE')),provider_subject varchar(255) NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(provider,provider_subject));
CREATE TABLE IF NOT EXISTS payout_destinations(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),artist_id uuid NOT NULL REFERENCES artist_profiles(id) ON DELETE CASCADE,provider varchar(40) NOT NULL,destination_token varchar(255) NOT NULL,is_default boolean NOT NULL DEFAULT false,status record_status NOT NULL DEFAULT 'PENDING',created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS artist_rights(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),artist_id uuid NOT NULL REFERENCES artist_profiles(id) ON DELETE CASCADE,track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,role varchar(60) NOT NULL DEFAULT 'PRIMARY_ARTIST',ownership_percent numeric(5,2) CHECK(ownership_percent>=0 AND ownership_percent<=100),territory varchar(120),starts_at timestamptz,ends_at timestamptz,metadata jsonb NOT NULL DEFAULT '{}'::jsonb,created_at timestamptz NOT NULL DEFAULT now());

ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS original_filename varchar(255);
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS replaced_by_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL;
ALTER TABLE upload_jobs ADD COLUMN IF NOT EXISTS cancelled_at timestamptz;
ALTER TABLE upload_jobs ADD COLUMN IF NOT EXISTS completed_at timestamptz;

CREATE OR REPLACE VIEW artist_full_backend AS SELECT ar.public_id artist_id,a.public_id account_id,a.email,a.status account_status,a.email_verified_at,a.onboarding_status,a.profile_complete,ar.display_name,ar.legal_name,ar.country_code,ar.plan,ar.verification_status,ar.bio,ar.avatar_url,ar.banner_url,ar.website_url,ar.social_links,ar.upload_enabled,ar.payout_profile,ar.rights_profile,COALESCE(ab.available_minor,0) available_minor,COALESCE(ab.pending_minor,0) pending_minor,COALESCE(ab.currency,'EUR') currency,(SELECT count(*) FROM tracks t WHERE t.artist_id=ar.id AND t.deleted_at IS NULL) track_count,(SELECT count(*) FROM releases r WHERE r.artist_id=ar.id) release_count FROM artist_profiles ar JOIN accounts a ON a.id=ar.account_id LEFT JOIN artist_balances ab ON ab.artist_id=ar.id;
COMMIT;
