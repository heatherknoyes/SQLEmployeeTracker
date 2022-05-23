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

module.exports = { db, VIEW_DEPARTMENTS, VIEW_ROLES, VIEW_EMPLOYEES };
