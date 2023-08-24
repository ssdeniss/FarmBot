CREATE TABLE fr_zones
(
    id       SERIAL PRIMARY KEY,
    plant_id INT,
    mode     VARCHAR(10),
    address  SMALLINT UNIQUE
);

ALTER TABLE fr_zones
    ADD CONSTRAINT fk_zones_plants
        FOREIGN KEY (plant_id) REFERENCES fr_plants (id) ON DELETE SET NULL;


CREATE TABLE fr_events
(
    id         SERIAL PRIMARY KEY,
    execute_at TIMESTAMP   NOT NULL,
    zone_id    INT         NOT NULL,
    mode       VARCHAR(10) NOT NULL,
    title      VARCHAR(25),
    is_done    NUMERIC(1) default 0
);

ALTER TABLE fr_events
    ADD CONSTRAINT fk_events_zones
        FOREIGN KEY (zone_id) REFERENCES fr_zones (id) ON DELETE CASCADE;