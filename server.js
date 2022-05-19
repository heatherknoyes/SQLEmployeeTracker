const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const Helper = require("./utils/helperFunctions");

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

function determineQuery(data) {
  if (data.menuChoice === "View All Departments") {
    getQuery(`SELECT * FROM department`);
  } else if (data.menuChoice === "View All Roles") {
    getQuery(`SELECT * FROM role`);
  } else if (data.menuChoice === "View All Employees") {
    getQuery(`SELECT * FROM employee`);
  }
  db.end();
}

function getQuery(sql) {
  db.query(sql, (err, result) => {
    if (err) {
      result.status(400).json({ error: err.message });
    }
    console.log(table.getTable(result));
  });
}

function createEmployee(data) {
  if (data.employeeType === "Engineer") {
    return new Engineer(data.name, data.id, data.email, data.github);
  } else if (data.employeeType === "Intern") {
    return new Intern(data.name, data.id, data.email, data.school);
  }
  return new Manager(data.name, data.id, data.email, data.officeNumber);
}

async function init() {
  await inquirer
    .prompt(mainMenu)
    .then((response) => {
      if (response.menuChoice === "Quit the Program") {
        console.log("Quitting program ---------------- BYE FELICIA");
        db.end();
      } else {
        determineQuery(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

init();
