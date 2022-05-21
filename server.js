const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const {
  printProgramStart,
  printProgramEnd,
  confirmAnswerValidator,
} = require("./utils/helperFunctions");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "company_db",
});

const mainMenu = [
  {
    type: "list",
    message: "--- Main Menu ---",
    name: "menuChoice",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit the Program",
    ],
  },
];

async function determineQuery(data) {
  if (data.menuChoice === "View All Departments") {
    console.log("\n\nCompany Departments\n");
    getData(`select d.id as 'Department ID', 
    d.name as 'Department Name' from department d;`);
  } else if (data.menuChoice === "View All Roles") {
    console.log("\n\nCompany Roles\n");
    getData(`SELECT r.id as 'Role ID', r.title as 'Job Title', d.name as 'Department', 
    r.salary as 'Salary' FROM role r
    INNER JOIN department d on d.id = r.department_id;`);
  } else if (data.menuChoice === "View All Employees") {
    console.log("\n\nCompany Employees\n");
    getData(`SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Job Title', 
    d.name as 'Department', r.salary AS 'Employee Salary', CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager Name' 
    FROM employee e
    INNER JOIN role r on r.id = e.role_id
    INNER JOIN department d on d.id = r.department_id
    LEFT JOIN employee e2 on e2.id = e.manager_id;`);
  } else if (data.menuChoice === "Add a Department") {
    const response = await inquirer.prompt({
      type: "input",
      message: "Department Name: ",
      name: "department",
      validate: confirmAnswerValidator,
    });
    getData(`INSERT INTO department (name) VALUES ('${response.department}');`);
  } else if (data.menuChoice === "Add a Role") {
  } else if (data.menuChoice === "Add an Employee") {
  } else if (data.menuChoice === "Update an Employee Role") {
  }
}

function getData(sql) {
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(table.getTable(result));
    askQuestions();
  });
}

async function askQuestions() {
  const response = await inquirer.prompt(mainMenu);
  if (response.menuChoice === "Quit the Program") {
    db.end();
    printProgramEnd();
  } else {
    determineQuery(response);
  }
}

function init() {
  printProgramStart();
  askQuestions();
}

init();
