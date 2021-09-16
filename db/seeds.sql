/* Insert starter data into employees db tables */
INSERT INTO departments (name)
VALUES
    ('Finance'),
    ('Marketing'),
    ('Supply Chain'),
    ('Accounting'),
    ('Data Analytics');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Finance Manager', 125000, 1),
    ('Finance Employee', 70000, 1),
    ('Marketing Manager', 110000, 2),
    ('Marketing Employee', 60000, 2),
    ('Supply Chain Manager', 130000, 3),
    ('Supply Chain Employee', 75000, 3),
    ('Accounting Manager', 140000, 4),
    ('Accounting Employee', 80000, 4),
    ('Data Analytics Manager', 160000, 5),
    ('Data Analytics Employee', 100000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, NULL),
    ('Jane', 'Brown', 3, NULL),
    ('Thomas', 'Cruz', 5, NULL),
    ('Abby', 'Barberet', 7, NULL),
    ('David', 'Gravel', 9, NULL),
    ('Erin', 'Jorgenson', 2, 1),
    ('Clara', 'Painter', 4, 2),
    ('Joseph', 'Dawson', 6, 3),
    ('Erika', 'Alfaro', 8, 4),
    ('Patrick', 'Castillo', 10, 5);