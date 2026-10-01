BEGIN;

CREATE TABLE IF NOT EXISTS admin_roles (
 code varchar(40) PRIMARY KEY,
 name varchar(100) NOT NULL,
 permissions jsonb NOT NULL DEFAULT '[]'::jsonb
);
INSERT INTO admin_roles(code,name,permissions) VALUES
 ('OWNER','Owner','["*"]'::jsonb),
 ('ADMIN','Administrator','["accounts.read","accounts.write","catalogue.read","catalogue.write","finance.read","support.write"]'::jsonb),
 ('SUPPORT','Support','["accounts.read","support.read","support.write"]'::jsonb),
 ('FINANCE','Finance','["accounts.read","finance.read","finance.write"]'::jsonb),
 ('MODERATOR','Moderator','["accounts.read","catalogue.read","moderation.read","moderation.write"]'::jsonb)
ON CONFLICT(code) DO UPDATE SET name=excluded.name,permissions=excluded.permissions;

ALTER TABLE admin_memberships ADD COLUMN IF NOT EXISTS role_code varchar(40) REFERENCES admin_roles(code);
UPDATE admin_memberships SET role_code=CASE WHEN role='OWNER' THEN 'OWNER' ELSE 'ADMIN' END WHERE role_code IS NULL;

CREATE OR REPLACE FUNCTION set_artist_plan(p_artist_public_id varchar,p_plan artist_plan) RETURNS void LANGUAGE plpgsql AS $$ BEGIN UPDATE artist_profiles SET plan=p_plan WHERE public_id=upper(btrim(p_artist_public_id)); IF NOT FOUND THEN RAISE EXCEPTION 'Artist not found'; END IF; END $$;
CREATE OR REPLACE FUNCTION set_artist_verification(p_artist_public_id varchar,p_status verification_status) RETURNS void LANGUAGE plpgsql AS $$ BEGIN UPDATE artist_profiles SET verification_status=p_status WHERE public_id=upper(btrim(p_artist_public_id)); IF NOT FOUND THEN RAISE EXCEPTION 'Artist not found'; END IF; END $$;
CREATE OR REPLACE FUNCTION set_account_status(p_account_public_id varchar,p_status account_status) RETURNS void LANGUAGE plpgsql AS $$ BEGIN UPDATE accounts SET status=p_status WHERE public_id=upper(btrim(p_account_public_id)); IF NOT FOUND THEN RAISE EXCEPTION 'Account not found'; END IF; END $$;
CREATE OR REPLACE FUNCTION set_track_status(p_track_public_id varchar,p_status record_status) RETURNS void LANGUAGE plpgsql AS $$ BEGIN UPDATE tracks SET status=p_status WHERE public_id=upper(btrim(p_track_public_id)); IF NOT FOUND THEN RAISE EXCEPTION 'Track not found'; END IF; END $$;
CREATE OR REPLACE FUNCTION set_release_status(p_release_public_id varchar,p_status record_status) RETURNS void LANGUAGE plpgsql AS $$ BEGIN UPDATE releases SET status=p_status WHERE public_id=upper(btrim(p_release_public_id)); IF NOT FOUND THEN RAISE EXCEPTION 'Release not found'; END IF; END $$;

CREATE OR REPLACE VIEW admin_member_directory AS
SELECT a.public_id AS admin_id,a.email,a.status,am.role,am.role_code,am.created_at,ar.name AS role_name,ar.permissions
FROM admin_memberships am JOIN accounts a ON a.id=am.account_id LEFT JOIN admin_roles ar ON ar.code=am.role_code;

COMMIT;
