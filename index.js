const inquirer = require('inquirer');
const { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./lib/queries');
const { promptUser, promptInput } = require('./lib/utils');

async function main() {
    while (true) {
        const { choice } = await promptUser('What would you like to do?', [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]);

        switch (choice) {
            case 'View all departments':
                const departments = await getAllDepartments();
                console.table(departments);
                break;
            case 'View all roles':
                const roles = await getAllRoles();
                console.table(roles);
                break;
            case 'View all employees':
                const employees = await getAllEmployees();
                console.table(employees);
                break;
            case 'Add a department':
                const { input: departmentName } = await promptInput('Enter the name of the department:');
                await addDepartment(departmentName);
                console.log('Department added successfully!');
                break;
            case 'Add a role':
                const { input: roleName } = await promptInput('Enter the name of the role:');
                const { input: roleSalary } = await promptInput('Enter the salary for the role:');
                const departmentChoices = await getAllDepartments();
                const { choice: roleDepartment } = await promptUser('Select the department for the role:', departmentChoices.map(department => department.name));
                const selectedDepartment = departmentChoices.find(department => department.name === roleDepartment);
                await addRole(roleName, roleSalary, selectedDepartment.id);
                console.log('Role added successfully!');
                break;
            case 'Add an employee':
                const { input: firstName } = await promptInput('Enter the first name of the employee:');
                const { input: lastName } = await promptInput('Enter the last name of the employee:');
                const roleChoices = await getAllRoles();
                const { choice: employeeRole } = await promptUser('Select the role for the employee:', roleChoices.map(role => role.title));
                const selectedRole = roleChoices.find(role => role.title === employeeRole);
                const managerChoices = await getAllEmployees();
                const { choice: employeeManager } = await promptUser('Select the manager for the employee:', ['None', ...managerChoices.map(manager => `${manager.first_name} ${manager.last_name}`)]);
                const selectedManager = employeeManager === 'None' ? null : managerChoices.find(manager => `${manager.first_name} ${manager.last_name}` === employeeManager);
                await addEmployee(firstName, lastName, selectedRole.id, selectedManager ? selectedManager.id : null);
                console.log('Employee added successfully!');
                break;
            case 'Update an employee role':
                const employeeChoices = await getAllEmployees();
                const { choice: selectedEmployee } = await promptUser('Select the employee to update:', employeeChoices.map(employee => `${employee.first_name} ${employee.last_name}`));
                const employeeToUpdate = employeeChoices.find(employee => `${employee.first_name} ${employee.last_name}` === selectedEmployee);
                const newRoleChoices = await getAllRoles();
                const { choice: newRole } = await promptUser('Select the new role for the employee:', newRoleChoices.map(role => role.title));
                const selectedNewRole = newRoleChoices.find(role => role.title === newRole);
                await updateEmployeeRole(employeeToUpdate.id, selectedNewRole.id);
                console.log('Employee role updated successfully!');
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
        }
    }
}

main();