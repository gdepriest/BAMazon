# BAMazon 🛒

BAMazon is a series of 3 Node apps that use MySQL.  The customer app takes orders from customers and depletes from the store inventory.  The manager app tracks sales and offers the ability to create new products and add to existing inventory.  The supervisor app allows the user to track sales by department and create new departments.

<img src="./images/bamazonCapture.PNG" alt="screen capture of game">

## Functionality 💪
#### Here's how I created the app: 

* I started by creating the MySQL database for BAMazon, and created a table with my initial products.  My product list is centered on the idea of useless things in 2019.  I suppose my take on this and the resulting inventory is debatable.  

```mysql
DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  stock_quantity INT NULL, 
  product_sales DECIMAL(15,2) NULL, 
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("VHS Tape Rewinder", "Electronics", 690.99, 45, 0), 
("Dial-Up Modem", "Electronics", 6.99, 69, 0), 
("Pager", "Electronics", 699.99, 75, 0), 
```

* I then created my bamazonCustomer.js file, established the connection with my database and built-out the functions necessary for running the app.  The customer is first prompted, using inquirer, how they would like to shop - whether by department, see all products, bargain bin, or exit.  Note: Bargain Bin was added at the very end, to reflect how I like to shop.

* When customers shop by department, they are prompted with the list of departments.  While this was originally hard-coded with the departments I knew to exist, I later realized this had to be accomplished by accessing the products table in order to update with new departments and products as they came available via the manager and supervisor apps.  The following snippet shows how I removed duplicates from that list of departments from my products table, to display within the inquirer prompt. 

```javascript
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

```

*  The user is then able to see the list of available products under that department.  When the product has fewer than 5 in inventory, customers see the order soon message with how many products are left in inventory.

<img src="./images/orderSoon.PNG" alt="Order Soon message">


* I then run my buyBamazon function, which first prompts the user with the Item ID of the product they want to purchase, then the quantity they would like to order.  The user confirms their order after seeing the price, and the database is updated - with the new figures for stock quantity and product sales.  If the user inputs a quantity greater than is available in stock, they receive a message to select fewer.

<img src="./images/shopByDept.gif" alt="shop by department demonstration" width="600px">

* The See All Products and Bargain Bin run in a similar way.  The See All shows all products available for purchase, and the Bargain Bin filters the response by items that have a price that is less than or equal to 5.00.  Both run the buyBamazon function, which prompts the user for the item id and the quantity.

<img src="./images/seeAll.PNG" alt="See All Products">

<img src="./images/bargainBin.PNG" alt="Bargain Bin">









## Getting Started 🏁

These instructions will get you a copy of the project up and running on your local machine for grading and testing purposes. 

1. Clone repository. 
3. Open repository in your IDE of choice.
4. Install node packages specified in the package.json - inquirer, mysql.
5. Open MySQL workbench, and create the database and tables using the seeds.sql document.
4. Open Bash or Terminal, run ```node bamazonCustomer.js```, ```node bamazonManager.js``` or ```node bamazonSupervisor.js```.



## Built With 🔧

* NodeJS
* Spotify API
* BandsInTown API
* OMDB API
* MomentJS
* Inquirer


## Authors ⌨️

* **Genevieve DePriest** - [gdepriest](https://github.com/gdepriest)

## Acknowledgments 🌟

* Amber Burroughs, Tutoring badass
* Lindsey, TA goddess
* Grace, TA goddess
* Sarah Cullen, Maestro
