CREATE TABLE fls_files
(
    ID           serial PRIMARY KEY,
    file_name    VARCHAR(255) NOT NULL,
    content_type VARCHAR(255) DEFAULT 'application/octet-stream' NOT NULL,
    upload_date  TIMESTAMP(0),
    file_size    BIGINT NOT NULL,
    store_path   VARCHAR(250),
    is_deleted   SMALLINT DEFAULT 0
);