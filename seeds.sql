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
("Pager Case, leather", "Accessories", 2.99, 87, 0), 
("The Little Mermaid VHS", "Movies, Music & Games", 10.99, 8, 0), 
("Rotary Telephone w/ cord extension", "Electronics", 30.99, 78, 0), 
("Gremlins Laser Disc", "Movies, Music & Games", 35.99, 199, 0), 
("Alabama 8-Track", "Movies, Music & Games", 1.99, 73, 0), 
("Road Atlas", "Travel", 14.99, 62, 0), 
("Type Writer", "Electronics", 178.99, 87, 0), 
("Floppy Disks", "Office", 3.99, 5888, 0), 
("Dutch Blitz", "Movies, Music & Games", 2.99, 59, 0),
("Room Mates 1-900-737-2233", "Services", 3.99, 3, 0), 
("Travel Agent", "Services", 5.99, 3, 0),
("Lifecall", "Services", 1.99, 3, 0),
("The Pocket Fisherman", "Outdoor", 19.99, 12, 0),
("Egg Scrambler", "Kitchen", 19.99, 92, 0),
("Great Looking Hair", "Pharmacy/Cosmetics", 19.99, 89, 0),
("Head On", "Pharmacy/Cosmetics", 2.99, 85, 0), 
("The Perfect Bacon Bowl", "Kitchen", 9.99, 5, 0),
("The Cornballer", "Kitchen", 29.99, 10, 0);

SELECT * FROM products;

USE bamazonDB;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Kitchen", 999.98), ("Pharmacy/Cosmetics", 825.36), ("Outdoor", 1000), ("Services", 2555.69), ("Movies, Music & Games", 899.67), ("Electronics", 1452.36), ("Travel", 799.420), ("Accessories", 5666.32);

SELECT * FROM departments;