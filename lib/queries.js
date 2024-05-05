const pool = require('./connection');

// Define functions to perform SQL queries
async function getAllDepartments() {
    const [rows, fields] = await pool.query('SELECT * FROM department');
    return rows;
}

async function getAllRoles() {
    const [rows, fields] = await pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id');
    return rows;
}

async function getAllEmployees() {
    const [rows, fields] = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
    return rows;
}

async function addDepartment(name) {
    await pool.query('INSERT INTO department (name) VALUES (?)', [name]);
}

async function addRole(title, salary, departmentId) {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
}

async function addEmployee(firstName, lastName, roleId, managerId) {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
}

async function updateEmployeeRole(employeeId, roleId) {
    await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};