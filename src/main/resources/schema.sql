CREATE TABLE employee_data
(
    id           INTEGER GENERATED BY DEFAULT AS IDENTITY,
    Name         VARCHAR(255),
    Email        VARCHAR(255),
    Phone_Number VARCHAR(255),
    PRIMARY KEY (id)
);