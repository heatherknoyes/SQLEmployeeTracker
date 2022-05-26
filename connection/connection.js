const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "company_db",
});

const VIEW_DEPARTMENTS = `select d.id as 'Department ID', 
d.name as 'Department Name' from department d;`;

const VIEW_ROLES = `SELECT r.id as 'Role ID', r.title as 'Job Title', d.name as 'Department', 
r.salary as 'Salary' FROM role r
INNER JOIN department d on d.id = r.department_id;`;

const VIEW_EMPLOYEES = `SELECT e.id AS 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Job Title', 
d.name as 'Department', r.salary AS 'Employee Salary', CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager Name' 
FROM employee e
INNER JOIN role r on r.id = e.role_id
INNER JOIN department d on d.id = r.department_id
LEFT JOIN employee e2 on e2.id = e.manager_id;`;

const VIEW_DEPARTMENT_BUDGET = `select SUM(r.salary) AS 'budget' from employee e 
inner join role r on r.id = e.role_id
inner join department d on d.id = r.department_id
where d.name = ?;`;

const VIEW_EMPLOYEE_NAMES = `SELECT CONCAT(e.first_name, ' ', e.last_name) as 'name' FROM employee e;`;
const VIEW_ROLE_OPTIONS = `SELECT r.title FROM role r;`;
const VIEW_DEPARTMENT_NAME = `SELECT d.name from department d;`;
const GET_DEPARTMENT_ID = `SELECT d.id FROM department d where d.name = ? limit 1;`;
const GET_ROLE_ID = `SELECT r.id FROM role r where r.title = ? limit 1;`;
const GET_EMPLOYEE_ID = `SELECT e.id FROM employee e where e.first_name = ? and e.last_name = ? limit 1;`;

module.exports = {
  db,
  VIEW_DEPARTMENTS,
  VIEW_DEPARTMENT_NAME,
  VIEW_DEPARTMENT_BUDGET,
  VIEW_EMPLOYEES,
  VIEW_EMPLOYEE_NAMES,
  VIEW_ROLES,
  VIEW_ROLE_OPTIONS,
  GET_DEPARTMENT_ID,
  GET_EMPLOYEE_ID,
  GET_ROLE_ID,
};
