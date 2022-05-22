
USE employee_db;
INSERT INTO departments (name)

VALUES
    ('Engineering'),
    ('Marketing'), 
    ('Sales'),
    ('Human Resources');

INSERT INTO roles (title, salary, dept_id)
VALUES
    ('Manager', 150000, 1),
    ('Engineer', 70000, 1),
    ('Salesperson', 80000, 3),
    ('Marketing Manager', 100000, 2),
    ('Marketing Assistant', 60000, 2),
    ('Product Manager', 120000, 4),
    ('Product Engineer', 90000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Smith', 1, NULL),
    ('John', 'Doe', 2, 1),
    ('John', 'Williams', 3, 1),
    ('Sally', 'Johnson', 4, 1),
    ('Bob', 'Smith', 5, 2),
    ('Sally', 'Smith', 6, 2),
    ('Sally', 'Williams', 7, 2),
    ('Sally', 'Johnson', 8, 2),
    ('Jane', 'Doe', 9, 3),
    ('Jane', 'Williams', 10, 3),
    ('Jane', 'Johnson', 11, 3),
    ('John', 'Smith', 12, 4),
    ('John', 'Williams', 13, 4),
    ('John', 'Johnson', 14, 4),
    ('Sally', 'Smith', 15, 5),
    ('Sally', 'Williams', 16, 5);
