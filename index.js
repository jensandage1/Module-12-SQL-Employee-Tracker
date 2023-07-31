const inquirer = require('inquirer');

const mysql = require('mysql2');
require("console.table");

//connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'weDge1_.$A',
        database: 'employee_tracker_db'
    },
        
        );

        connection.connect(function(err) {
            if (err) throw err;
       

        });
        
  


const init = () => {
    inquirer.prompt ([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role"
                    ]
        }
    ])
    .then((answers => {
        const { action } = answers;


        if (action === "View all departments") {
            console.log ("Viewing all Departments");
            viewAllDepartments();
        } else if (action === "View all roles") {
            console.log("Viewing all roles");
             viewAllRoles();
        } else if  (action === "View all employees") {
            console.log ("Viewing all employees");
            viewAllEmployees();
        } else if (action === "Add a department") {
            console.log("Adding a department");
            addDepartment();
        } else if (action === "Add a role") {
            console.log("Adding a role");
            addRole();
        } else if (action === "Add an employee"){
            console.log("Adding an employee");
            addEmployee();
        }    else if (action === "Update an employee's role"){
            console.log("Updating a role");
            updateRole();
        }

    }))
    
};

//function to view all departments - working
async function viewAllDepartments() {
let sql = "SELECT * FROM department";  
const [departments] = await connection.promise().query(sql)
console.table(departments);
init();
};

//function to view all roles - working
async function viewAllRoles() {
    let sql = 'SELECT * FROM roles';
    const [roles] = await connection.promise().query(sql)
console.table(roles);
init();
};

//function to view all employees - working 
async function viewAllEmployees() {
    let sql = 'SELECT * FROM employee';
    const [employee] = await connection.promise().query(sql)
console.table(employee);
init();
};


//function to add a department - working
async function addDepartment() {
    try {
    const {department} = await inquirer.prompt ([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department you want to add?",
        }
    ])
    await connection.promise().query(`INSERT INTO department (department_name) VALUES ('${department}')`)
    viewAllDepartments();
} catch(err){
    console.log(err);
}
};

//function to add an employee - working
async function addEmployee() {
    const [employee] = await connection.promise().query("SELECT * FROM employee");
    const [roles] = await connection.promise().query("SELECT * FROM roles");
    try {
        const { first_name, last_name, roles_id, manager_id } = await inquirer.prompt ([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee you want to add",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of the employee you want to add",
            },
            {
                type: "list",
                name: "roles_id",
                message: "Please choose a role from the list below",
                choices: roles.map(({id, title}) => {
                    return {
                        value: id, 
                        name: title
                    } 
                })
            },
            {
                type: "list",
                name: "manager_id",
                message: "Please choose a manager from the list below",
                choices: employee.map(({id, first_name, last_name})=> {
                    return {
                        value: id, 
                        name: `${first_name} ${last_name}`
                    }
                })
            },

        ])
        await connection.promise().query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${first_name}', '${last_name}', ${roles_id}, ${manager_id})`);
        viewAllEmployees();
    } catch(err){
        console.log(err);
    }
};

//function to add a role - working
async function addRole() {
    const [roles] = await connection.promise().query("SELECT * FROM roles");
    const [department] = await connection.promise().query("SELECT * FROM department");
    try {
        const { title, salary, department_id } = await inquirer.prompt ([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role you want to add?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for the role you want to add?",
            },
            {
                type: "list",
                name: "department_id",
                message: "Please choose a department that this role belongs to from the list below.",
                choices: department.map(({id, department_name}) => {
                    return {
                        value: id, 
                        name: department_name
                    } 
                })
            }
        ])
        await connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', ${department_id})`);
        viewAllRoles();
    } catch(err){
        console.log(err);
    }
};


//function to update an employee's role - working
async function updateRole(){
    const [employee] = await connection.promise().query("SELECT * FROM employee");
    const [roles] = await connection.promise().query("SELECT * FROM roles");
    try {
        const { employee_id, updated_role } = await inquirer.prompt ([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee's role would you like to update?",
                choices: employee.map(({id, first_name, last_name, roles_id}) => {
                    return {
                        value: id,
                        name: `${first_name} ${last_name}`
                    }
                })
            },
            {
                type: "list",
                name: "updated_role",
                message: "Which role would you like to reassign the selected employee to?",
                choices: roles.map(({id, title})=> {
                    return {
                        value: id,
                        name: title
                    }
                })
            },
        ])
    await connection.promise().query(`UPDATE employee SET roles_id = ${updated_role} WHERE id = ${employee_id};`)
    viewAllEmployees();
} catch(err){
    console.log(err);
}};

init();