-- seeds.sql

-- Insert sample data into the department table
INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Marketing');

-- Insert sample data into the role table
INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 80000, 1),
    ('Lead Engineer', 100000, 1),
    ('Sales Representative', 60000, 2),
    ('Sales Manager', 90000, 2),
    ('Accountant', 70000, 3),
    ('Financial Analyst', 85000, 3),
    ('Marketing Coordinator', 55000, 4),
    ('Marketing Manager', 75000, 4);

-- Insert sample data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Bob', 'Johnson', 3, NULL),
    ('Alice', 'Williams', 4, 3),
    ('Tom', 'Brown', 5, NULL),
    ('Sara', 'Davis', 6, 5),
    ('Mike', 'Wilson', 7, NULL),
    ('Emily', 'Taylor', 8, 7);