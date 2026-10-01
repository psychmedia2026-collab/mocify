BEGIN;

CREATE TABLE IF NOT EXISTS listener_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  display_name varchar(160),
  country_code char(2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  artist_id uuid NOT NULL REFERENCES artist_profiles(id) ON DELETE CASCADE,
  title varchar(240) NOT NULL,
  release_type varchar(30) NOT NULL DEFAULT 'SINGLE' CHECK(release_type IN ('SINGLE','EP','ALBUM')),
  status record_status NOT NULL DEFAULT 'PENDING',
  release_date date,
  artwork_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS releases_artist_idx ON releases(artist_id);

ALTER TABLE tracks ADD COLUMN IF NOT EXISTS release_id uuid REFERENCES releases(id) ON DELETE SET NULL;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS duration_seconds integer CHECK(duration_seconds IS NULL OR duration_seconds >= 0);
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS audio_url text;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS explicit boolean NOT NULL DEFAULT false;
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS isrc varchar(20);
CREATE UNIQUE INDEX IF NOT EXISTS tracks_isrc_unique_idx ON tracks(isrc) WHERE isrc IS NOT NULL;

CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  owner_account_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
  name varchar(180) NOT NULL,
  visibility varchar(20) NOT NULL DEFAULT 'PRIVATE' CHECK(visibility IN ('PRIVATE','PUBLIC','UNLISTED')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS playlist_tracks (
  playlist_id uuid NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  position integer NOT NULL CHECK(position >= 0),
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(playlist_id,track_id),
  UNIQUE(playlist_id,position)
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  account_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  subject varchar(240) NOT NULL,
  status varchar(30) NOT NULL DEFAULT 'OPEN' CHECK(status IN ('OPEN','IN_PROGRESS','WAITING_USER','RESOLVED','CLOSED')),
  priority varchar(20) NOT NULL DEFAULT 'NORMAL' CHECK(priority IN ('LOW','NORMAL','HIGH','URGENT')),
  assigned_admin_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_account_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  body text NOT NULL,
  internal_note boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS support_messages_ticket_idx ON support_messages(ticket_id,created_at);

CREATE TABLE IF NOT EXISTS moderation_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id varchar(32) NOT NULL UNIQUE,
  reporter_account_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  target_type varchar(40) NOT NULL,
  target_public_id varchar(32) NOT NULL,
  reason varchar(120) NOT NULL,
  details text,
  status varchar(30) NOT NULL DEFAULT 'OPEN' CHECK(status IN ('OPEN','REVIEWING','ACTIONED','DISMISSED')),
  assigned_admin_id uuid REFERENCES accounts(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  type varchar(80) NOT NULL,
  title varchar(200) NOT NULL,
  body text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS notifications_account_idx ON notifications(account_id,created_at DESC);

CREATE TABLE IF NOT EXISTS webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider varchar(80) NOT NULL,
  provider_event_id varchar(255) NOT NULL,
  event_type varchar(120) NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  processed_at timestamptz,
  processing_error text,
  received_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(provider,provider_event_id)
);

CREATE OR REPLACE FUNCTION assign_release_public_id() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('REL'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS release_public_id_trigger ON releases;
CREATE TRIGGER release_public_id_trigger BEFORE INSERT ON releases FOR EACH ROW EXECUTE FUNCTION assign_release_public_id();
CREATE OR REPLACE FUNCTION assign_playlist_public_id() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('PLY'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS playlist_public_id_trigger ON playlists;
CREATE TRIGGER playlist_public_id_trigger BEFORE INSERT ON playlists FOR EACH ROW EXECUTE FUNCTION assign_playlist_public_id();
CREATE OR REPLACE FUNCTION assign_ticket_public_id() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('TKT'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS ticket_public_id_trigger ON support_tickets;
CREATE TRIGGER ticket_public_id_trigger BEFORE INSERT ON support_tickets FOR EACH ROW EXECUTE FUNCTION assign_ticket_public_id();
CREATE OR REPLACE FUNCTION assign_moderation_public_id() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.public_id IS NULL OR btrim(NEW.public_id)='' THEN NEW.public_id:=next_public_id('MOD'); END IF; RETURN NEW; END $$;
DROP TRIGGER IF EXISTS moderation_public_id_trigger ON moderation_cases;
CREATE TRIGGER moderation_public_id_trigger BEFORE INSERT ON moderation_cases FOR EACH ROW EXECUTE FUNCTION assign_moderation_public_id();

CREATE OR REPLACE VIEW admin_track_directory AS
SELECT t.id,t.public_id AS track_id,t.title,t.status,t.duration_seconds,t.explicit,t.isrc,t.created_at,
       ap.public_id AS artist_id,ap.display_name AS artist_name,
       r.public_id AS release_id,r.title AS release_title,
       COUNT(se.id) FILTER(WHERE se.counted)::bigint AS total_streams
FROM tracks t JOIN artist_profiles ap ON ap.id=t.artist_id
LEFT JOIN releases r ON r.id=t.release_id
LEFT JOIN stream_events se ON se.track_id=t.id
GROUP BY t.id,t.public_id,t.title,t.status,t.duration_seconds,t.explicit,t.isrc,t.created_at,ap.public_id,ap.display_name,r.public_id,r.title;

CREATE OR REPLACE VIEW admin_payment_directory AS
SELECT p.public_id AS payment_id,a.public_id AS account_id,a.email,p.provider,p.provider_reference,
       p.amount_minor,p.currency,p.status,p.created_at,p.settled_at
FROM payments p JOIN accounts a ON a.id=p.account_id;

CREATE OR REPLACE VIEW admin_payout_directory AS
SELECT p.public_id AS payout_id,ap.public_id AS artist_id,ap.display_name AS artist_name,
       p.amount_minor,p.currency,p.status,p.created_at,p.executed_at
FROM payouts p JOIN artist_profiles ap ON ap.id=p.artist_id;

CREATE OR REPLACE VIEW admin_business_directory AS
SELECT bp.public_id AS business_id,a.email,bp.legal_name,bp.country_code,bp.verification_status,a.status,bp.created_at
FROM business_profiles bp JOIN accounts a ON a.id=bp.account_id;

CREATE OR REPLACE VIEW admin_listener_directory AS
SELECT a.public_id AS listener_id,a.email,a.status,lp.display_name,lp.country_code,a.created_at,
       COUNT(se.id) FILTER(WHERE se.counted)::bigint AS total_streams
FROM accounts a LEFT JOIN listener_profiles lp ON lp.account_id=a.id
LEFT JOIN stream_events se ON se.listener_account_id=a.id
WHERE a.type='LISTENER'
GROUP BY a.id,a.public_id,a.email,a.status,lp.display_name,lp.country_code,a.created_at;

COMMIT;
