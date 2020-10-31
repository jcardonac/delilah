CREATE TABLE users (
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(10) UNIQUE NOT NULL,
	password VARCHAR(10) NOT NULL,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(20) NOT NULL,
	telephone INT(20) NOT NULL,
	shipping_address VARCHAR(100) NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT FALSE,
	is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE products (
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INT(8) NOT NULL,
    image TEXT,
    is_available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE status_order_type (
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL
);

CREATE TABLE orders (
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
	date DATETIME NOT NULL,
    description TEXT,
    total_cost INT(8) NOT NULL,
    payment_method VARCHAR(20),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE order_status (
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	order_id INT(10) NOT NULL,
	status_id INT(10) NOT NULL,
	updated_date DATETIME NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
	FOREIGN KEY(status_id) REFERENCES status_order_type(id)
);

CREATE TABLE order_details (
	id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	order_id INT(10) NOT NULL,
	product_id INT(10) NOT NULL,
	product_amount INT(4) NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);

ALTER TABLE "order_details" ADD CONSTRAINT "details_order_id" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE;
SELECT * FROM `orders` JOIN users on user_id=users.id JOIN order_details on orders.id=order_details.order_id WHERE 1 
SELECT p.* ,
c.Name AS 'Client Name' ,
pr.Name AS 'Provider Name'
FROM Portfolio p
INNER JOIN Client c ON p.Client_id=c.id
INNER JOIN Provider pr ON c.Provider_id = pr.id;

SELECT o.* ,
c.Name AS 'Client Name' ,
pr.Name AS 'Provider Name'
FROM orders o
INNER JOIN order_details d ON o.id= d.order_id
INNER JOIN order_states s ON o.id = s.order_id


CREATE TABLE user_favorites (
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    product_id INT(10) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);