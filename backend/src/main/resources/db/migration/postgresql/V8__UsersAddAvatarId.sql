ALTER TABLE FR_USER
    ADD COLUMN AVATAR_ID INT;

ALTER TABLE FR_USER
    ADD CONSTRAINT fk_user_fls_files
        FOREIGN KEY (AVATAR_ID) REFERENCES fls_files (id) ON DELETE SET NULL;