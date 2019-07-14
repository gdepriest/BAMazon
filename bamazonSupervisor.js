var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazonDB"
});
  
connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        type: "list",
        name: "mainMenu",
        message: "BAMazon Supervisor Mode - How would you like to proceed?",
        choices: ["View Product Sales by Department", "Create New Department",  "Exit"],

    }).then(function(answer) {
        switch(answer.mainMenu) {
            case "View Product Sales by Department":
                salesByDept();
            break;
            case "Create New Department":
                newDept();
            break;
            case "Exit":
                connection.end();
            break;
        };
    });
}

function salesByDept() {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(IFNULL(products.product_sales, 0)) AS product_sales, SUM(IFNULL(products.product_sales, 0))-departments.over_head_costs AS total_profit FROM products RIGHT JOIN departments ON (departments.department_name = products.department_name) GROUP BY departments.department_id, departments.department_name, departments.over_head_costs"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);

        mainMenu();
    })
}

function newDept() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.log(`\nCreate New Department \n`);
        inquirer.prompt([
            {
                name: "deptName",
                message: "Enter the name of the department:",
            },
            {
                name: "overHead",                
                message: "Enter the overhead cost: <123.45>",
            }
        ]).then(function(answers) {
            
            connection.query("INSERT INTO departments SET ?", {
                department_name: answers.deptName,
                over_head_costs: parseFloat(answers.overHead)}, function(err) {
                if (err) throw err;
                console.log(`\n\n New department - ${answers.deptName.toUpperCase()} - successfully added.\n\n`);

                mainMenu();

            });

            
           
        });
    });
}

