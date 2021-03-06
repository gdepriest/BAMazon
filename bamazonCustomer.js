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
    runBamazon();
});

function runBamazon() {
    inquirer.prompt({
        type: "list",
        name: "firstChoice",
        message: "Welcome to BAMazon, how would you like to shop?",
        choices: ["Shop by Department", "See All Products", "Bargain Bin", "Exit"],

    }).then(function(answer) {
        switch(answer.firstChoice) {
            case "Shop by Department":
                shopByDept();
            break;
            case "See All Products":
                showAll();
            break;
            case "Bargain Bin":
                bargain();
            break;
            case "Exit":
                connection.end();
            break;
        };
    });
}

function shopByDept() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        inquirer.prompt({
            type: "list",
            name: "department",
            message: "Please choose a department from the following list:",
            choices: function() {

                var departments = res.map(function(product) {
                    return product.department_name
                });
                

                return departments.filter(function(item, index){
                    return departments.indexOf(item) >= index;
                });
            }
        })
        .then(function(answer) {
            var query = "SELECT products.item_id, products.product_name, products.price, products.stock_quantity FROM products WHERE products.department_name = ?"
            console.log(`\n ${answer.department.toUpperCase()}`);
            connection.query(query, [answer.department], function(err, res) {
                if (err) throw err;
                console.log(`\n ${res.length} products found! \n ___________ \n`)
    
                for (i=0; i<res.length; i++) {
                    console.log(`\n ${res[i].product_name.toUpperCase()} \n 
                    Price: $${res[i].price} \n 
                    Item ID: ${res[i].item_id}`);
                    if (res[i].stock_quantity <= 5) {
                        console.log(`\n Order Soon!  Only ${res[i].stock_quantity} left in stock! \n`)
                    };
                    console.log("\n--------------------------------\n\n");
                }   
              buyBamazon();
            })
    
        });
    })

    
   
};

function showAll() {
    var query = "SELECT products.item_id, products.product_name, products.price, products.stock_quantity FROM products";
    console.log(`\n All BAMazon Products \n`);
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            console.log(` ${res[i].product_name.toUpperCase()}  |  Price: $${res[i].price} |  Item ID: ${res[i].item_id}`);
            if (res[i].stock_quantity <= 5) {
                console.log(`\n Order Soon!  Only ${res[i].stock_quantity} left in stock! \n`)
            };
            console.log("--------------------------------\n");
        };
        buyBamazon();
    })

}

function bargain() {
    connection.query("SELECT products.item_id, products.product_name, products.price, products.stock_quantity FROM products WHERE products.price <= 5.00", function(err, res) {
        if (err) throw err;
        console.log(`\n Bargain Bin \n\n`)
        for (i=0; i<res.length; i++) {
            console.log(` ${res[i].product_name.toUpperCase()}  |  Price: $${res[i].price} |  Item ID: ${res[i].item_id}`);
            if (res[i].stock_quantity <= 5) {
                console.log(`\n Order Soon!  Only ${res[i].stock_quantity} left in stock! \n`)
            };
            console.log("--------------------------------\n");
        };
        buyBamazon();
    })
}

//function that buys from Bamazon - makes the purchase, updates the database, returns that it can't proceed if not enough inventory, tells how much it costs, asks if user wants to proceed.
function buyBamazon() {
    inquirer.prompt([
        {
            name: "productID",
            message: "Please enter the Item ID of the product you would like to purchase. ",
            validate: function(value) {
                if (isNaN(parseInt(value)) || parseInt(value) < 1) {
                    return "Please choose a valid Item ID.";
                };

                return true;
            }
        },
        {
            name: "quantity",
            message: "How many would you like to buy?",
            validate: function(value) {
                if (isNaN(value)) {
                    return "Please enter the number you would like to purchase."
                };
                
                return true;
            },
        },
    ]).then(function(answers) {
        var query1 = "SELECT * FROM products WHERE products.item_id = ?";
        var query2 = "UPDATE products SET ? WHERE products.item_id = ?";

        connection.query(query1, [parseInt(answers.productID)], function(err, res) {
            if (err) throw err; 
            var stockDiff = res[0].stock_quantity - parseInt(answers.quantity);
            var prodSales = parseInt(res[0].product_sales) + parseFloat(parseFloat(res[0].price) * parseInt(answers.quantity)).toFixed(2);
            if (stockDiff < 0) {
                console.log(`Apologies! BAMazon currently has only ${res[0].stock_quantity} ${res[0].product_name}s left in stock.  Please choose a different amount.`)
                buyBamazon();
            }else {
                console.log(`\n\nYour total comes to $${parseFloat(res[0].price * parseInt(answers.quantity)).toFixed(2)}\n\n`);
                inquirer.prompt({
                    name: "checkout",
                    message: "Do you want to proceed?",
                    type: "confirm",
                    default: true,
                }).then(function(answer) {

                    if (answer.checkout) {                        
                        connection.query(query2, [{stock_quantity: stockDiff, product_sales: prodSales }, parseInt(answers.productID)], function(err, res) {
                            if (err) throw err;

                            console.log(`\n\n\n*****************************\n\n Thanks for your purchase! \n\n*****************************\n\n\n`);
                            runBamazon();
                            
                        });
        
                    } else {
                        buyBamazon();
                    };

                });
            };

        });
    });
}