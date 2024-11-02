-- examples
-- CREATE TABLE IF NOT EXISTS users (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE IF NOT EXISTS posts (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     user_id INTEGER NOT NULL,
--     title VARCHAR(200) NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );


-- orders
CREATE TABLE IF NOT EXISTS orders (
    orderID VARCHAR(14) PRIMARY KEY,
    customerID VARCHAR(8) NOT NULL,
    employeeID SMALLINT NOT NULL,
    productID VARCHAR(15) NOT NULL,
    orderDate DATE NOT NULL,
    paymentMethod VARCHAR(20) NOT NULL,
    orderStatus VARCHAR(10) NOT NULL DEFAULT 'active',
    amount DECIMAL(7, 2) NOT NULL,
    quantity SMALLINT NOT NULL,
    discount DECIMAL(3, 2) DEFAULT 0.00,
    profit DECIMAL(7, 2) NOT NULL,
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (employeeID) REFERENCES employees(employeeID),
    FOREIGN KEY (productID) REFERENCES products(productID)
);

-- departments
CREATE TABLE IF NOT EXISTS departments (
    departmentID SMALLINT PRIMARY KEY AUTOINCREMENT,
    departmentName VARCHAR(50) NOT NULL UNIQUE,
    employeeCount SMALLINT NOT NULL DEFAULT 0
);