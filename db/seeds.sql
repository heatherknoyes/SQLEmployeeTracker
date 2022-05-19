INSERT INTO department (name)
VALUES ('Human Resources'),
       ('Engineering'),
       ('Sales'),
       ('Production Support'),
       ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES ('Human Resources Manager', 50000, 1),
       ('Backend Software Engineer', 70000, 2),
       ('Product Salesman', 45000, 3),
       ('Customer Representative', 40000, 4),
       ('Transportation Coordinator', 55000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Charles', 'Cornelius', 1),
       ('Arya', 'Stark', 2),
       ('Alexander', 'Thegreat', 3),
       ('Heather', 'Hightower', 4),
       ('Ryan', 'Foreal', 5);

UPDATE employee SET manager_id = 1 WHERE id >= 2;