/* Insert starter data into employees db tables */
INSERT INTO departments (name)
VALUES
    ('Finance'),
    ('Marketing'),
    ('Accounting'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Finance Manager', 125000, 1),
    ('Finance Employee', 70000, 1),
    ('Marketing Manager', 110000, 2),
    ('Marketing Employee', 60000, 2),
    ('Accounting Manager', 140000, 3),
    ('Accounting Employee', 80000, 3),
    ('Sales Manager', 100000, 4),
    ('Sales Employee', 55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Brown', 3, NULL),
    ('Joe', 'Smith', 5, NULL),
    ('Jessica', 'Jones', 7, NULL),
    ('Juan', 'Carlos', 2, 1),
    ('Bob', 'Schmoe', 4, 2),
    ('Mike', 'James', 6, 3),
    ('Tom', 'Anderson', 8, 4);