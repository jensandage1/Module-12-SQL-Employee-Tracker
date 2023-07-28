const express = require ('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'weDge1_.$A',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_tracker_db')
);

