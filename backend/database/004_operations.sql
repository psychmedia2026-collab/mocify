BEGIN;

-- Keep new mutable records timestamped by PostgreSQL.
DROP TRIGGER IF EXISTS releases_updated_at_trigger ON releases;
CREATE TRIGGER releases_updated_at_trigger BEFORE UPDATE ON releases FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS listener_profiles_updated_at_trigger ON listener_profiles;
CREATE TRIGGER listener_profiles_updated_at_trigger BEFORE UPDATE ON listener_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS playlists_updated_at_trigger ON playlists;
CREATE TRIGGER playlists_updated_at_trigger BEFORE UPDATE ON playlists FOR EACH ROW EXECUTE FUNCTION set_updated_at();
DROP TRIGGER IF EXISTS support_tickets_updated_at_trigger ON support_tickets;
CREATE TRIGGER support_tickets_updated_at_trigger BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION create_listener_account(p_email varchar,p_display_name varchar DEFAULT NULL,p_country_code char(2) DEFAULT NULL)
RETURNS TABLE(account_public_id varchar) LANGUAGE plpgsql AS $$
DECLARE v_id uuid; v_public varchar;
BEGIN
 INSERT INTO accounts(public_id,type,email,status) VALUES(NULL,'LISTENER',lower(btrim(p_email)),'ACTIVE') RETURNING id,public_id INTO v_id,v_public;
 INSERT INTO listener_profiles(account_id,display_name,country_code) VALUES(v_id,NULLIF(btrim(p_display_name),''),upper(p_country_code));
 RETURN QUERY SELECT v_public;
END $$;

CREATE OR REPLACE FUNCTION create_business_account(p_email varchar,p_legal_name varchar,p_country_code char(2) DEFAULT NULL)
RETURNS TABLE(account_public_id varchar,business_public_id varchar) LANGUAGE plpgsql AS $$
DECLARE v_id uuid; v_acc varchar; v_bus varchar;
BEGIN
 INSERT INTO accounts(public_id,type,email,status) VALUES(NULL,'BUSINESS',lower(btrim(p_email)),'ACTIVE') RETURNING id,public_id INTO v_id,v_acc;
 INSERT INTO business_profiles(public_id,account_id,legal_name,country_code) VALUES(NULL,v_id,btrim(p_legal_name),upper(p_country_code)) RETURNING public_id INTO v_bus;
 RETURN QUERY SELECT v_acc,v_bus;
END $$;

CREATE OR REPLACE FUNCTION create_release(p_artist_public_id varchar,p_title varchar,p_release_type varchar DEFAULT 'SINGLE',p_release_date date DEFAULT NULL)
RETURNS varchar LANGUAGE plpgsql AS $$
DECLARE v_artist uuid; v_public varchar;
BEGIN
 SELECT id INTO v_artist FROM artist_profiles WHERE public_id=upper(btrim(p_artist_public_id));
 IF v_artist IS NULL THEN RAISE EXCEPTION 'Artist not found'; END IF;
 INSERT INTO releases(public_id,artist_id,title,release_type,release_date) VALUES(NULL,v_artist,btrim(p_title),upper(p_release_type),p_release_date) RETURNING public_id INTO v_public;
 RETURN v_public;
END $$;

CREATE OR REPLACE FUNCTION create_track(p_artist_public_id varchar,p_title varchar,p_release_public_id varchar DEFAULT NULL,p_duration_seconds integer DEFAULT NULL,p_explicit boolean DEFAULT false,p_isrc varchar DEFAULT NULL)
RETURNS varchar LANGUAGE plpgsql AS $$
DECLARE v_artist uuid; v_release uuid; v_public varchar;
BEGIN
 SELECT id INTO v_artist FROM artist_profiles WHERE public_id=upper(btrim(p_artist_public_id));
 IF v_artist IS NULL THEN RAISE EXCEPTION 'Artist not found'; END IF;
 IF p_release_public_id IS NOT NULL THEN
   SELECT id INTO v_release FROM releases WHERE public_id=upper(btrim(p_release_public_id)) AND artist_id=v_artist;
   IF v_release IS NULL THEN RAISE EXCEPTION 'Release not found for artist'; END IF;
 END IF;
 INSERT INTO tracks(public_id,artist_id,title,release_id,duration_seconds,explicit,isrc)
 VALUES(NULL,v_artist,btrim(p_title),v_release,p_duration_seconds,p_explicit,NULLIF(upper(btrim(p_isrc)),'')) RETURNING public_id INTO v_public;
 RETURN v_public;
END $$;

CREATE OR REPLACE VIEW admin_release_directory AS
SELECT r.public_id AS release_id,r.title,r.release_type,r.status,r.release_date,r.artwork_url,r.created_at,
 ap.public_id AS artist_id,ap.display_name AS artist_name,COUNT(t.id)::bigint AS track_count
FROM releases r JOIN artist_profiles ap ON ap.id=r.artist_id LEFT JOIN tracks t ON t.release_id=r.id
GROUP BY r.id,r.public_id,r.title,r.release_type,r.status,r.release_date,r.artwork_url,r.created_at,ap.public_id,ap.display_name;

CREATE OR REPLACE VIEW admin_subscription_directory AS
SELECT s.id,s.plan_code,s.status,s.starts_at,s.renews_at,s.ends_at,s.created_at,a.public_id AS account_id,a.type AS account_type,a.email
FROM subscriptions s JOIN accounts a ON a.id=s.account_id;

CREATE OR REPLACE VIEW admin_support_directory AS
SELECT st.public_id AS ticket_id,st.subject,st.status,st.priority,st.created_at,st.updated_at,a.public_id AS account_id,a.email,
 COUNT(sm.id)::bigint AS message_count
FROM support_tickets st LEFT JOIN accounts a ON a.id=st.account_id LEFT JOIN support_messages sm ON sm.ticket_id=st.id
GROUP BY st.id,st.public_id,st.subject,st.status,st.priority,st.created_at,st.updated_at,a.public_id,a.email;

CREATE OR REPLACE VIEW admin_moderation_directory AS
SELECT mc.public_id AS case_id,mc.target_type,mc.target_public_id,mc.reason,mc.status,mc.created_at,mc.resolved_at,
 a.public_id AS reporter_id,a.email AS reporter_email
FROM moderation_cases mc LEFT JOIN accounts a ON a.id=mc.reporter_account_id;

CREATE OR REPLACE VIEW admin_risk_directory AS
SELECT rc.public_id AS case_id,rc.status,rc.score,rc.temporary_hold,rc.opened_at,rc.resolved_at,rc.resolution,
 ap.public_id AS artist_id,ap.display_name AS artist_name,t.public_id AS track_id,p.public_id AS payout_id,
 COUNT(rs.id)::bigint AS signal_count
FROM risk_cases rc LEFT JOIN artist_profiles ap ON ap.id=rc.artist_id LEFT JOIN tracks t ON t.id=rc.track_id
LEFT JOIN payouts p ON p.id=rc.payout_id LEFT JOIN risk_signals rs ON rs.risk_case_id=rc.id
GROUP BY rc.id,rc.public_id,rc.status,rc.score,rc.temporary_hold,rc.opened_at,rc.resolved_at,rc.resolution,ap.public_id,ap.display_name,t.public_id,p.public_id;

COMMIT;
