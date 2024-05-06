// Import the necessary modules.
const inquirer = require('inquirer');
const cTable = require('console.table');
const { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./lib/queries');
const figlet = require('figlet');

// Define the main function.
async function main() {

    // Display the welcome message and instructions.
    console.log('\n');
    console.log(figlet.textSync('Employee Tracker', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
    console.log('\n');
    console.log('Welcome to the Employee Tracker!');
    console.log('\n');
    console.log('Use the arrow keys to navigate the menu.');
    console.log('\n');
    console.log('Press Enter to select an option.');
    console.log('\n');

    // Create a loop to keep the application running until the user exits.
    while (true) {
        // Prompt the user to select an action.
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

        // Switch statement to handle the user's selection.
        switch (action) {
            case 'View all departments':
                // Call the viewAllDepartments function.
                await viewAllDepartments();
                break;
            case 'View all roles':
                // Call the viewAllRoles function.
                await viewAllRoles();
                break;
            case 'View all employees':
                // Call the viewAllEmployees function.
                await viewAllEmployees();
                break;
            case 'Add a department':
                // Call the addDepartmentPrompt function.
                await addDepartmentPrompt();
                break;
            case 'Add a role':
                // Call the addRolePrompt function.
                await addRolePrompt();
                break;
            case 'Add an employee':
                // Call the addEmployeePrompt function.
                await addEmployeePrompt();
                break;
            case 'Update an employee role':
                // Call the updateEmployeeRolePrompt function.
                await updateEmployeeRolePrompt();
                break;
            case 'Exit':
                // Exit the application.
                console.log('Exiting application...');
                return;
        }
    }
}

// Define the viewAllDepartments function.
async function viewAllDepartments() {
    try {
        // Get all departments from the database.
        const departments = await getAllDepartments();

        // Log the departments to the console.
        console.log('\n');
        console.table(departments);
    } catch (error) {
        // Log the error message to the console.
        console.error('Error retrieving departments:', error.message);
    }

    // Call the main function again.
    main();
}

// Define the viewAllRoles function.
async function viewAllRoles() {
    try {
        // Get all roles from the database.
        const roles = await getAllRoles();

        // Log the roles to the console.
        console.log('\n');
        console.table(roles);
    } catch (error) {
        // Log the error message to the console.
        console.error('Error retrieving roles:', error.message);
    }

    // Call the main function again.
    main();
}

// Define the viewAllEmployees function.
async function viewAllEmployees() {
    try {
        // Get all employees from the database.
        const employees = await getAllEmployees();

        // Log the employees to the console.
        console.log('\n');
        console.table(employees);
    } catch (error) {
        // Log the error message to the console.
        console.error('Error retrieving employees:', error.message);
    }

    // Call the main function again.
    main();
}

// Define the addDepartmentPrompt function.
async function addDepartmentPrompt() {
    // Prompt the user to enter the name of the department.
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);

    try {
        // Add the department to the database.
        await addDepartment(name);

        // Log a success message to the console.
        console.log('Department added successfully!');
    } catch (error) {
        // Log the error message to the console.
        console.error('Error adding department:', error.message);
    }

    // Call the main function again.
    main();
}

// Define the addRolePrompt function.
async function addRolePrompt() {
    // Get all departments from the database.
    const departments = await getAllDepartments();

    // Create an array of choices for the department selection.
    const departmentChoices = departments.map(({ id, name }) => ({
        name: `${name}`,
        value: id
    }));

    // Prompt the user to enter the title, salary, and department of the role.
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
        // Add the role to the database.
        await addRole(title, salary, departmentId);

        // Log a success message to the console.
        console.log('Role added successfully!');
    } catch (error) {
        // Log the error message to the console.
        console.error('Error adding role:', error.message);
    }

    // Call the main function again.
    main();
}

// Define the addEmployeePrompt function.
async function addEmployeePrompt() {
    // Get all roles from the database.
    const roles = await getAllRoles();

    // Create an array of choices for the role selection.
    const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id
    }));

    // Get all employees from the database.
    const employees = await getAllEmployees();

    // Create an array of choices for the manager selection.
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

    // Prompt the user to enter the first name, last name, role, and manager of the employee.
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
        // Add the employee to the database.
        await addEmployee(firstName, lastName, roleId, managerId);

        // Log a success message to the console.
        console.log('Employee added successfully!');
    } catch (error) {
        // Log the error message to the console.
        console.error('Error adding employee:', error.message);
    }

    // Call the main function again.
    main();
}

// Define the updateEmployeeRolePrompt function.
async function updateEmployeeRolePrompt() {
    // Get all employees from the database.
    const employees = await getAllEmployees();

    // Create an array of choices for the employee selection.
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    // Get all roles from the database.
    const roles = await getAllRoles();

    // Create an array of choices for the role selection.
    const roleChoices = roles.map(({ id, title }) => ({
        name: `${title}`,
        value: id
    }));

    // Prompt the user to select the employee and role to update.
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
        // Update the employee's role in the database.
        await updateEmployeeRole(employeeId, roleId);

        // Log a success message to the console.
        console.log('Employee role updated successfully!');
    } catch (error) {
        // Log the error message to the console.
        console.error('Error updating employee role:', error.message);
    }

    // Call the main function again.
    main();
}

// Call the main function to start the application.
main();
