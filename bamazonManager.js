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
        name: "firstChoice",
        message: "BAMazon Manager Mode - How would you like to proceed?",
        choices: ["See All Products", "View Low Inventory", "Add to Inventory", "Add New Product",  "Exit"],

    }).then(function(answer) {
        switch(answer.firstChoice) {
            case "See All Products":
                showAll();
            break;
            case "View Low Inventory":
                seeLow();
            break;
            case "Add to Inventory":
                stockShelves();
            break;
            case "Add New Product":
                createNew();
            break;
            case "Exit":
                connection.end();
            break;
        };
    });
}

function showAll() {
    var query = "SELECT products.item_id, products.product_name, products.price, products.stock_quantity FROM products";
    console.log(`\n All BAMazon Products \n`);
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

}

function seeLow() {
    var query2 = "SELECT products.item_id, products.product_name, products.price, products.stock_quantity FROM products WHERE products.stock_quantity<=5";
    console.log(`\n\nBAMazon stock running low...\n\n`)
    connection.query(query2, function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu();
    })
}

function stockShelves() {
    inquirer.prompt([
        {
            name: "productID",
            message: "Please enter the Item ID of the product you would like to update.",
            validate: function(value) {
                if (isNaN(parseInt(value)) || parseInt(value) < 1) {
                    return "Please choose a valid Item ID.";
                };

                return true;
            }
        },
        {
            name: "quantity",
            message: "Enter the quantity added:",
            validate: function(value) {
                if (isNaN(value)) {
                    return "Please enter the number you are adding to the BAMazon stock"
                };
                
                return true;
            },
        }
    ]).then(function(answers) {

        var query3 = "SELECT * FROM products WHERE products.item_id = ?";
        var query4 = "UPDATE products SET ? WHERE products.item_id = ?";

        connection.query(query3, [(parseInt(answers.productID))], function(err, res) {
            if (err) throw err;

            var stockUpdate = res[0].stock_quantity + parseInt(answers.quantity)

            console.log(`There are currently ${res[0].stock_quantity} of ${res[0].product_name}.  Your addition of ${answers.quantity} will make ${stockUpdate}.`);
            inquirer.prompt({
                name: "updateConfirm",
                message: "Do you want to proceed?",
                type: "confirm",
                default: true,
            }).then(function(answer) {

                if (answer.updateConfirm) {                        
                    connection.query(query4, [{stock_quantity: stockUpdate }, parseInt(answers.productID)], function(err, res) {
                        if (err) throw err;

                        console.log(`\n*****************************\n Product updated to ${stockUpdate}. \n*****************************\n`);
                        mainMenu();
                        
                    });
    
                } else {
                    mainMenu();
                };

            })
        })


    })
}        
     
    