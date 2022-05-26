# SQLEmployeeTracker

[![License: Apache](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Description

The motivation for this project was to create a company database that a user could interact with through a command line UI. I utilized MYSQL2 for the package to integrate with my database, inquirer for asking the user questions, as well as the node package figma for the command line text art. The thing I'm most proud of for this project is that I was able to get a bonus criteria completed so that a user can see a combined department's budget based on the employee salaries of that departmnet. In the future I would like to integrate this site with a front end framework so that it has the added benefit of ease of use for a non-technical user. With the completion of this project I fulfilled the following user story and acceptance criteria.

[Link to video of the application functioning](https://drive.google.com/file/d/14ec6oetbm6l-L_osEKn0zP5Xi-z8UE1M/view)

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

Run the following command in order to be able to install the package for this code:

    npm install

## Usage

To run this code from the parent directory use the following command:

    npm start

## License

This project is covered under the following license: [![License: Apache](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Contributing

To contribute to this project please clone the repo locally and commit your code using a separate branch. Please have unit tests for your code and make sure all tests pass using the test command before opening a pull request.

## Questions

If there are any questions on the work provided in this repository please use the following contact information:

GitHub: [heatherknoyes](https://github.com/heatherknoyes)

Email: heatherknoyes@gmail.com
