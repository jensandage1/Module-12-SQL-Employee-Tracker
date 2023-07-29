const inquirer = require('inquirer');
// const server = require('./server');
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
        //    console.log("connected");

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
                "Update a role",
                "Update an employee"
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
        }    else if (action === "Update a role"){
            console.log("Updating a role");
            updateRole();
        } else if (action === "Update an employee"){
            console.log("Updating an employee");
            updateEmployee();
        }

    }))
    
};

let sql = "";

async function viewAllDepartments() {
let sql = "SELECT * FROM department";  
const [departments] = await connection.promise().query(sql)
console.table(departments);
init();
};

async function viewAllRoles() {
    let sql = 'SELECT * FROM roles';
    const [roles] = await connection.promise().query(sql)
console.table(roles);
init();
};

async function viewAllEmployees() {
    let sql = 'SELECT * FROM employee';
    const [employee] = await connection.promise().query(sql)
console.table(employee);
init();
};

async function addDepartment() {
    // let sql = 'INSERT INTO department' 
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

async function addEmployee() {
    const [employee] = await connection.promise().query("SELECT * FROM employee");
    const [roles] = await connection.promise().query("SELECT * FROM roles");
    console.log(employee, roles);
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
                choices: roles.map(({id, title})=> {
                    return{
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
                    return{
                        value: id, 
                        name: `${first_name} ${last_name}`
                    }
                })
            },

        ])
        await connection.promise().query(`INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${first_name}', '${last_name}', ${roles_id}, ${manager_id})`)
        viewAllEmployees();
    } catch(err){
        console.log(err);
    }
};

function updateRole(){
    console.log("Updating a role")
    let sql =  "UPDATE role"
};

function updateEmployee(){
    console.log("Updating an employee")
    let sql = "UPDATE employee"
};

init();