// Import the connection pool from the connection module
const pool = require('./connection');

// Define a function to get all departments from the database
async function getAllDepartments() {
    // Execute the SQL query to get all departments
    const [rows, fields] = await pool.query('SELECT * FROM department');
    // Return the rows from the query
    return rows;
}

// Define a function to get all roles from the database
async function getAllRoles() {
    // Execute the SQL query to get all roles
    const [rows, fields] = await pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id');
    // Return the rows from the query
    return rows;
}

// Define a function to get all employees from the database
async function getAllEmployees() {
    // Execute the SQL query to get all employees
    const [rows, fields] = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
    // Return the rows from the query
    return rows;
}

// Define a function to add a new department to the database
async function addDepartment(name) {
    // Execute the SQL query to insert a new department
    await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
}

// Define a function to add a new role to the database
async function addRole(title, salary, departmentId) {
    // Execute the SQL query to insert a new role
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
}

// Define a function to add a new employee to the database
async function addEmployee(firstName, lastName, roleId, managerId) {
    // Execute the SQL query to insert a new employee
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
}

// Define a function to update the role of an employee
async function updateEmployeeRole(employeeId, roleId) {
    // Execute the SQL query to update the employee's role
    await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

// Export the functions to be used in other modules
module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
