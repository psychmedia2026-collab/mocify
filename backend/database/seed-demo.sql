BEGIN;

-- Fictitious development data only. Never use these records as real identities.
WITH a AS (
  INSERT INTO accounts(public_id,type,email,status)
  VALUES ('USR-000001','ARTIST','andigo@mocify.demo','ACTIVE') RETURNING id
), artist AS (
  INSERT INTO artist_profiles(public_id,account_id,display_name,legal_name,country_code,plan,verification_status)
  SELECT 'ART-000001',id,'Andigo','Demo Artist One','NL','ARTIST_MAX','ACTIVE' FROM a RETURNING id
)
INSERT INTO tracks(public_id,artist_id,title,status,licensing_opt_in,licensing_terms_version,licensing_consented_at)
SELECT 'TRK-000001',id,'Doar Una','ACTIVE',true,'demo-v1',now() FROM artist;

WITH a AS (
  INSERT INTO accounts(public_id,type,email,status)
  VALUES ('USR-000002','ARTIST','nova@mocify.demo','ACTIVE') RETURNING id
), artist AS (
  INSERT INTO artist_profiles(public_id,account_id,display_name,legal_name,country_code,plan,verification_status)
  SELECT 'ART-000002',id,'Nova Ray','Demo Artist Two','DE','ARTIST_FREE','PENDING' FROM a RETURNING id
)
INSERT INTO tracks(public_id,artist_id,title,status,licensing_opt_in)
SELECT 'TRK-000007',id,'Midnight Echo','ACTIVE',false FROM artist;

INSERT INTO public_id_counters(namespace,last_value) VALUES
('USR',2),('ART',2),('TRK',7),('PAY',10881),('OUT',2045),('LIC',1048),('RC',1048),('AUD',0)
ON CONFLICT(namespace) DO UPDATE SET last_value=GREATEST(public_id_counters.last_value,EXCLUDED.last_value);

COMMIT;
