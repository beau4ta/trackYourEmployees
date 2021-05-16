DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name  VARCHAR(30),
    role_id INT,
    manager_id INT
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

// SEEDS
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");
INSERT INTO department (name)
VALUE ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Beau", "Fortier", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jason", "Ortiz", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kyle","Gray",null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kristopher", "Shagovac", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Logan", "Payne", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Amaria", "Cardona", 3, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jane", "Doe", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;