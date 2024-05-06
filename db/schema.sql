-- Create the department table
-- This table stores information about the different departments in the company.
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- The name of the department.
    name VARCHAR(30)
);

-- Create the role table
-- This table stores information about the different roles in the company.
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- The title of the role.
    title VARCHAR(30),
    -- The salary associated with the role.
    salary DECIMAL(10, 2),
    -- The department that the role belongs to.
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the employee table
-- This table stores information about the employees in the company.
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- The first name of the employee.
    first_name VARCHAR(30),
    -- The last name of the employee.
    last_name VARCHAR(30),
    -- The role that the employee has.
    role_id INT,
    -- The manager of the employee.
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
