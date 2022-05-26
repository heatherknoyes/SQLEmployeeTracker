const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const {
  db,
  VIEW_DEPARTMENTS,
  VIEW_DEPARTMENT_NAME,
  VIEW_ROLES,
  VIEW_EMPLOYEES,
  VIEW_EMPLOYEE_NAMES,
  VIEW_ROLE_OPTIONS,
  GET_DEPARTMENT_ID,
  GET_EMPLOYEE_ID,
  GET_ROLE_ID,
} = require("./connection/connection");
const table = require("console.table");
const {
  printProgramStart,
  printProgramEnd,
  confirmAnswerValidator,
  confirmDigitValidator,
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
    await getDepartmentInput();
    console.log("\nDepartment Added to Database\n");
    askQuestions();
  } else if (data.menuChoice === "ADD_ROLE") {
    await getRoleInput();
    console.log("\nRole Added to Database\n");
    askQuestions();
  } else if (data.menuChoice === "ADD_EMPLOYEE") {
    await getNewEmployeeInput();
    console.log("\nEmployee Added to Database\n");
    askQuestions();
  } else if (data.menuChoice === "UPDATE_EMPLOYEE") {
    await getUpdatedEmployeeInput();
    console.log("\nEmployee Role Updated\n");
    askQuestions();
  }
}

async function viewData(sql) {
  try {
    return await db.promise().query(sql);
  } catch (err) {
    console.log(err);
  }
}

async function viewDataWithInput(sql, input, input2) {
  try {
    if (input2) {
      return await db.promise().query(sql, [input, input2]);
    }
    return await db.promise().query(sql, input);
  } catch (err) {
    console.log(err);
  }
}

async function getNewEmployeeInput() {
  const roles = await viewData(VIEW_ROLE_OPTIONS);
  const employees = await viewData(VIEW_EMPLOYEE_NAMES);

  const response = await inquirer.prompt([
    {
      type: "input",
      message: "Employee First Name: ",
      name: "firstName",
      validate: confirmAnswerValidator,
    },
    {
      type: "input",
      message: "Employee Last Name: ",
      name: "lastName",
      validate: confirmAnswerValidator,
    },
    {
      type: "list",
      message: "Role: ",
      name: "role",
      choices: roles[0].map((item) => item.title),
    },
    {
      type: "list",
      message: "Manager: ",
      name: "manager",
      choices: employees[0].map((item) => item.name),
    },
  ]);

  const managerId = await viewDataWithInput(
    GET_EMPLOYEE_ID,
    response.manager.split(" ")[0],
    response.manager.split(" ")[1]
  );
  const roleId = await viewDataWithInput(GET_ROLE_ID, response.role);
  insertData(
    `insert into employee (first_name, last_name, role_id, manager_id) values('${response.firstName}', '${response.lastName}', ${roleId[0][0].id}, ${managerId[0][0].id});`
  );
  return response;
}

async function getUpdatedEmployeeInput() {
  const employees = await viewData(VIEW_EMPLOYEE_NAMES);
  const roles = await viewData(VIEW_ROLE_OPTIONS);

  const response = await inquirer.prompt([
    {
      type: "list",
      message: "Employee: ",
      name: "employee",
      choices: employees[0].map((item) => item.name),
    },
    {
      type: "list",
      message: "Role: ",
      name: "role",
      choices: roles[0].map((item) => item.title),
    },
  ]);

  return response;
}

async function getDepartmentInput() {
  const response = await inquirer.prompt({
    type: "input",
    message: "Department Name: ",
    name: "department",
    validate: confirmAnswerValidator,
  });
  insertData(
    `INSERT INTO department (name) VALUES ('${response.department}');`
  );
  return response;
}

async function getRoleInput() {
  const departments = await viewData(VIEW_DEPARTMENT_NAME);
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "Role Name: ",
      name: "title",
      validate: confirmAnswerValidator,
    },
    {
      type: "input",
      message: "Salary Amount: ",
      name: "salary",
      validate: confirmDigitValidator,
    },
    {
      type: "list",
      message: "Department Name: ",
      name: "department",
      choices: departments[0].map((item) => item.name),
    },
  ]);

  const departmentIds = await viewDataWithInput(
    GET_DEPARTMENT_ID,
    response.department
  );
  insertData(
    `INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${departmentIds[0][0].id});`
  );

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
  db.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
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
