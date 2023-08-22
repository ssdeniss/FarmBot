-- Create the tax_plant_category table
CREATE TABLE fr_plants
(
    id              SERIAL PRIMARY KEY,
    plant_type_id   INT,
    humidity_min    NUMERIC(5, 2),
    humidity_max    NUMERIC(5, 2),
    temperature_min NUMERIC(5, 2),
    temperature_max NUMERIC(5, 2),
    name            VARCHAR(25),
    description     VARCHAR(255)
);

-- Add a foreign key constraint to tax_plant_category referencing tax_plant_types
ALTER TABLE fr_plants
    ADD CONSTRAINT fk_plant_type
        FOREIGN KEY (plant_type_id) REFERENCES tax_plant_types (id) ON DELETE CASCADE;