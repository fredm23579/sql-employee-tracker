const inquirer = require('inquirer');
const cTable = require('console.table');
const { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./lib/queries');

async function main() {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ]);

        switch (action) {
            case 'View all departments':
                await viewAllDepartments();
                break;
            case 'View all roles':
                await viewAllRoles();
                break;
            case 'View all employees':
                await viewAllEmployees();
                break;
            case 'Add a department':
                await addDepartmentPrompt();
                break;
            case 'Add a role':
                await addRolePrompt();
                break;
            case 'Add an employee':
                await addEmployeePrompt();
                break;
            case 'Update an employee role':
                await updateEmployeeRolePrompt();
                break;
            case 'Exit':
                console.log('Exiting application...');
                return;
        }
    }
}

async function viewAllDepartments() {
    try {
        const departments = await getAllDepartments();
        console.log('\n');
        console.table(departments);
    } catch (error) {
        console.error('Error retrieving departments:', error.message);
    }
    main();
}

async function viewAllRoles() {
    try {
        const roles = await getAllRoles();
        console.log('\n');
        console.table(roles);
    } catch (error) {
        console.error('Error retrieving roles:', error.message);
    }
    main();
}

async function viewAllEmployees() {
    try {
        const employees = await getAllEmployees();
        console.log('\n');
        console.table(employees);
    } catch (error) {
        console.error('Error retrieving employees:', error.message);
    }
    main();
}

async function addDepartmentPrompt() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);
    try {
        await addDepartment(name);
        console.log('Department added successfully!');
    } catch (error) {
        console.error('Error adding department:', error.message);
    }
    main();
}

async function addRolePrompt() {
    const departments = await getAllDepartments();
    const departmentChoices = departments.map(({ id, name }) => ({
        name: `${name}`,
        value: id
    }));

    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary for the role:'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for the role:',
            choices: departmentChoices
        }
    ]);
    try {
        await addRole(title, salary, departmentId);
        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error.message);
    }
    main();
}

async function addEmployeePrompt() {
    const roles = await getAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id
    }));

    const employees = await getAllEmployees();
    const managerChoices = [
        {
            name: 'None',
            value: null
        },
        ...employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
    ];

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the role for the employee:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the manager for the employee:',
            choices: managerChoices
        }
    ]);
    try {
        await addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added successfully!');
    } catch (error) {
        console.error('Error adding employee:', error.message);
    }
    main();
}

async function updateEmployeeRolePrompt() {
    const employees = await getAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const roles = await getAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id
    }));

    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        }
    ]);
    try {
        await updateEmployeeRole(employeeId, roleId);
        console.log('Employee role updated successfully!');
    } catch (error) {
        console.error('Error updating employee role:', error.message);
    }
    main();
}

main();