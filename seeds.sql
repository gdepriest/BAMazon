DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  stock_quantity INT NULL,  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VHS Tape Rewinder", "Electronics", 690.99, 45), 
("Dial-Up Modem", "Electronics", 6.99, 69), 
("Pager", "Electronics", 699.99, 75), 
("Pager Case, leather", "Accessories", 2.99, 87), 
("The Little Mermaid VHS", "Movies, Music & Games", 10.99, 8), 
("Rotary Telephone w/ cord extension", "Electronics", 30.99, 78), 
("Gremlins Laser Disc", "Movies, Music & Games", 35.99, 199), 
("Alabama 8-Track", "Movies, Music & Games", 1.99, 73), 
("Road Atlas", "Travel", 14.99, 62), 
("Type Writer", "Electronics", 178.99, 87), 
("Floppy Disks", "Office", 3.99, 5888), 
("Dutch Blitz", "Movies, Music & Games", 2.99, 59),
("Room Mates 1-900-737-2233", "Services", 3.99, 3), 
("Travel Agent", "Services", 5.99, 3),
("Lifecall", "Services", 1.99, 3),
("The Pocket Fisherman", "Outdoor", 19.99, 12),
("Egg Scrambler", "Kitchen", 19.99, 92),
("Great Looking Hair", "Pharmacy/Cosmetics", 19.99, 89),
("Head On", "Pharmacy/Cosmetics", 2.99, 85), 
("The Perfect Bacon Bowl", "Kitchen", 9.99, 5),
("The Cornballer", "Kitchen", 29.99, 10);

SELECT * FROM products;