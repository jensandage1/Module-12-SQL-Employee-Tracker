const inquirer = require('inquirer');

const firstOption = () => {
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
        const {action} = answers;

        if (answers.firstOption === "View all departments") {
            console.log ("Viewing all Departments");
            viewAllDepartments();
        } else if (answers.firstOption === "View all roles") {
            console.log("Viewing all roles");
             viewAllRoles();
        } else if  (answers.firstOption === "View all employees") {
            console.log ("Viewing all employees");
            viewAllEmployees();
        } else if (answers.firstOption === "Add a department") {
            console.log("Adding a department");
            addDepartment();
        } else if (answers.firstOption === "Add a role") {
            console.log("Adding a role");
            addRole();
        } else if (answers.fristOption === "Add an employee"){
            console.log("Adding an employee");
            addEmployee();
        }    else if (answers.fristOption === "Update a role"){
            console.log("Updating a role");
            updateRole();
        } else if (answers.fristOption === "Update an employee"){
            console.log("Updating an employee");
            updateEmployee();
        }

    }))
};


function init(){
    inquirer.prompt(firstOption)
    .then((answers)=>{
        console.log(answers);
    })
}

init();

module.exports = {
    firstOption};