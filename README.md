
  <div align="center">
  <h1 align="center">SQL EMPLOYEE TRACKER</h1>
  <h3>Codebase for the SQL EMPLOYEE TRACKER platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-Node.js-004E89?logo=Node.js&style=for-the-badge" alt='Node.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-MySQL-004E89?logo=MySQL&style=for-the-badge" alt='MySQL\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Inquirer.js-004E89?logo=Inquirer.js&style=for-the-badge" alt='Inquirer.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-dotenv-004E89?logo=dotenv&style=for-the-badge" alt='dotenv\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-console.table-004E89?logo=console.table&style=for-the-badge" alt='console.table\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-mysql2-004E89?logo=mysql2&style=for-the-badge" alt='mysql2"' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" />
  </p>
  </div>
  
  ---
  ## 📚 Table of Contents
  - [📚 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [🌟 Features](#-features)
  - [📁 Repository Structure](#-repository-structure)
  - [💻 Code Summary](#-code-summary)
  - [🚀 Getting Started](#-getting-started)
  
  ---
  
  
  ## 🔍 Overview

 This is a Node.js project with a MySQL database, consisting of a RESTful API for managing departments, employees, and roles in a company. The project includes a `db` directory with schema and seed files, as well as a `lib` directory with utility functions for connecting to the database and performing queries. The `models` directory contains JavaScript classes for each of the three entities, and the `index.js` file is the entry point for the application.

---

## 🌟 Features

 Node.js, MySQL, RESTful API, departments, employees, roles, company, schema, seed, utility functions, connection, queries, models, JavaScript classes

---

## 📁 Repository Structure

```sh
├── .env
├── .gitignore
├── db
│   ├── schema.sql
│   └── seeds.sql
├── index.js
├── lib
│   ├── connection.js
│   ├── queries.js
│   └── utils.js
├── LICENSE
├── models
│   ├── department.js
│   ├── employee.js
│   └── role.js
├── package-lock.json
├── package.json
└── README.md

```

---

## 💻 Code Summary

<details><summary>Root</summary>

| File | Summary |
| ---- | ------- |
| index.js |  The code is a command-line interface (CLI) application that allows users to interact with a database of employee data, including viewing departments, roles, and employees, adding new departments, roles, and employees, and updating employee roles. |

</details>

---

<details><summary>\lib</summary>

| File | Summary |
| ---- | ------- |
| connection.js |  The code creates a connection pool for a MySQL database using the `mysql2` package and exports it as a promise. |
| queries.js |  The code defines a module that provides functions for performing SQL queries on a database, including getting all departments, roles, and employees, adding new departments, roles, and employees, and updating employee roles. |
| utils.js |  The code defines two functions, `promptUser` and `promptInput`, which use the `inquirer` library to prompt users for input in a list or input format, respectively. |

</details>

---

<details><summary>\models</summary>

| File | Summary |
| ---- | ------- |
| department.js |  The code defines a module that exports functions to interact with a database using the `pool` connection. |
| employee.js |  The code defines a module that exports functions to interact with a database using the `pool` constant, which is initialized with the `require()` function. |
| role.js |  The code defines a module that exports functions to interact with a database using the `pool` connection. |

</details>

---

## 🚀 Getting Started

 To get started with this project, follow these steps:<br>
1. Install the necessary dependencies by running `npm install` in your terminal.
2. Create a `.env` file in the root directory of the project and add your MySQL username and password to it, like this:
```
DB_USER=your_username
DB_PASSWORD=your_password
```
3. Start the application by running `npm start` in your terminal. This will launch the command-line interface and allow you to interact with the employee database.
4. Use the menu options to view and manage departments, employees, and roles. For example, you can use the `View all departments` option to see a list of all departments in the company, or the `Add a department` option to create a new department.
5. When you're finished, you can exit the application by typing `quit` at the prompt.

That's it! With these steps, you should be able to get started with this Node.js project and start managing your company's employee database.

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).
