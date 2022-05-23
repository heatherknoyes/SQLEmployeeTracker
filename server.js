const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const {
  db,
  VIEW_DEPARTMENTS,
  VIEW_ROLES,
  VIEW_EMPLOYEES,
} = require("./connection/connection");
const table = require("console.table");
const {
  printProgramStart,
  printProgramEnd,
  confirmAnswerValidator,
} = require("./utils/helperFunctions");

const mainMenu = [
  {
    type: "list",
    message: "--- Main Menu ---",
    name: "menuChoice",
    choices: [
      {
        name: "View All Departments",
        value: "VIEW_DEPARTMENTS",
      },
      {
        name: "View All Roles",
        value: "VIEW_ROLES",
      },
      {
        name: "View All Employees",
        value: "VIEW_EMPLOYEES",
      },
      {
        name: "Add a Department",
        value: "ADD_DEPARTMENT",
      },
      {
        name: "Add a Role",
        value: "ADD_ROLE",
      },
      {
        name: "Add an Employee",
        value: "ADD_EMPLOYEE",
      },
      {
        name: "Update an Employee Role",
        value: "UPDATE_EMPLOYEE",
      },
      {
        name: "Quit the Program",
        value: "QUIT",
      },
    ],
  },
];

async function determineQuery(data) {
  if (data.menuChoice === "VIEW_DEPARTMENTS") {
    console.log("\n\nCompany Departments\n");
    getData(VIEW_DEPARTMENTS);
  } else if (data.menuChoice === "VIEW_ROLES") {
    console.log("\n\nCompany Roles\n");
    getData(VIEW_ROLES);
  } else if (data.menuChoice === "VIEW_EMPLOYEES") {
    console.log("\n\nCompany Employees\n");
    getData(VIEW_EMPLOYEES);
  } else if (data.menuChoice === "ADD_DEPARTMENT") {
    const response = getDepartmentData();
    insertData(
      `INSERT INTO department (name) VALUES ('${response.department}');`
    );
  } else if (data.menuChoice === "ADD_ROLE") {
  } else if (data.menuChoice === "ADD_EMPLOYEE") {
  } else if (data.menuChoice === "UPDATE_EMPLOYEE") {
  }
}

function getDepartmentData() {
  const response = await inquirer.prompt({
    type: "input",
    message: "Department Name: ",
    name: "department",
    validate: confirmAnswerValidator,
  });
  return response;
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

function insertData(sql) {
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("Department added to database.");
    askQuestions();
  });
}

async function askQuestions() {
  const response = await inquirer.prompt(mainMenu);
  if (response.menuChoice === "QUIT") {
    db.end();
    printProgramEnd();
    process.exit();
  } else {
    determineQuery(response);
  }
}

function init() {
  printProgramStart();
  askQuestions();
}

init();
