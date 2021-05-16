const mysql = require('mysql');
const inquirer  = require('inquirer');
const util = require("util");
const { async } = require('rxjs');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    promptUser();
});
connection.query = util.promisify(connection.query)

const promptUser = async () => {
    await inquirer
        .prompt([{
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View Department',
                'View Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'EXIT'
            ]
        }])
        .then((response) => {
            switch (response.action) {
                case 'View All Employees':
                    return viewEmployee();
                    break;

                case 'View Department':
                    return viewDepartment();
                    break;

                case 'View Roles':
                    return viewRole();
                    break;

                case 'Add Employee':
                    return addEmployee();
                    break;

                case 'Add Department':
                    return addDepartment();
                    break;

                case 'Add Role':
                    return addRole();
                    break;

                case 'Update Employee Role':
                    return updateRole();
                    break;

                case 'EXIT':
                    return;
                    break;
            };
        });
};

const viewEmployee = async () => {
    let query = 
        'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ';
    query += 
        'FROM employee LEFT JOIN role ON (employee.role_id = role.id) ';
    query += 
        'LEFT JOIN department ON (department.id = role.department_id)';
        const employeeData = await connection.query(query);
        console.table(employeeData);
        promptUser();
}

const viewDepartment = async () => {
    let query =
    'SELECT * FROM department';
    const departmentData = await connection.query(query);
    console.table(departmentData);
    promptUser();
}

const viewRole = async () => {
    let query = 
    'SELECT * FROM role';
    const roleData = await connection.query(query);
    console.table(roleData);
    promptUser();
}

const addEmployee = async => {
    let query = 'SELECT role.id, role.title, department.name AS department, role.salary '; 
    query += 'FROM role LEFT JOIN department on role.department_id = department.id;'
    connection.query(query, (err, response) => {
        if (err) throw err;
        let roleArr = [];
        response.forEach(({title, id }) => {
            roleArr.push({name: title, value: id});
        });
        inquirer
            .prompt([
                {
                    name: "first",
                    type: "input",
                    message: "What's the employee's first name?"
                },
                {
                    name: "last",
                    type: "input",
                    message: "What's the employee's last name?"
                },
                {
                    name: "role",
                    type: "input",
                    message: "What is their role?",
                    choices: roleArr
                },
            ])
            .then((answer) => {
                var roleID = roleArr.indexOf(answer.role) + 1;
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first,
                        last_name: answer.last,
                        role_id: roleID,
                    },
                    (err) => {
                        if (err) throw err;
                        console.table(answer);
                        promptUser();
                    })
            })
        })    
}

const addDepartment = async () => {
    await inquirer
        .prompt([
            {
                name: 'department',
                type: 'input',
                message: 'What is the name of the department?'
            }
        ])
        .then((response) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: response.department
                },
                (err) => {
                    if (err) throw err;
                    console.table(response);
                    promptUser();
                }
            )
        })
};

const addRole = async () => {
    connection.query("SELECT role.title AS Title, role.salary AS salary FROM role", (err, res) => {
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'input',
                    message: 'What is the name of the role?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary in this role?'
                },
                {
                    name: 'department'
                }
            ])
            .then((response) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: response.role,
                        salary: response.salary,
                    },
                    (err) => {
                        if (err) throw err;
                        console.table(response);
                        promptUser();
                    })
            })
    })
}

const updateRole = async () => {

}