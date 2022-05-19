const Manager = require("./lib/Manager");
const Helper = require("./utils/helperFunctions");
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const path = require("path");
const table = require("console.table");

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
    Helper.getQuery(`SELECT * FROM department`);
  } else if (data.menuChoice === "View All Roles") {
    Helper.getQuery(`SELECT * FROM role`);
  } else if (data.menuChoice === "View All Employees") {
    Helper.getQuery(`SELECT * FROM employee`);
  }
  db.end();
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
  return null;
}

init();
