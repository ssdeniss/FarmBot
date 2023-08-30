ALTER TABLE fr_events
DROP
COLUMN is_done;

ALTER TABLE fr_events
    ADD is_done BOOLEAN;

ALTER TABLE fr_events
ALTER COLUMN mode TYPE varchar(15);