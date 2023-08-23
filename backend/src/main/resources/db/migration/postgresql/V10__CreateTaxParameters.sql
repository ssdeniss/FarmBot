CREATE TABLE tax_app_parameters
(
    id          SERIAL PRIMARY KEY,
    code        VARCHAR(10) NOT NULL UNIQUE,
    name        VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);