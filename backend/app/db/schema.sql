--CREATE TABLE IF NOT EXISTS users (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    username VARCHAR(50) NOT NULL UNIQUE,
--    email VARCHAR(100) NOT NULL UNIQUE,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--);

--CREATE TABLE IF NOT EXISTS posts (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    user_id INTEGER NOT NULL,
--    title VARCHAR(200) NOT NULL,
--    content TEXT,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    FOREIGN KEY (user_id) REFERENCES users(id)
--);

-- categories
CREATE TABLE IF NOT EXISTS categories (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(50) NOT NULL,
    subCategory VARCHAR(50) NOT NULL,
    categoryDescription TEXT,
    activeStatus BOOLEAN NOT NULL DEFAULT TRUE
);

-- products
CREATE TABLE IF NOT EXISTS products (
    productID VARCHAR(15) NOT NULL PRIMARY KEY,
    categoryID INT NOT NULL,
    productName VARCHAR(100) NOT NULL,
    price DECIMAL(19, 4) NOT NULL,
    stockCount INT NOT NULL,
    lastSold DATE NOT NULL,
    FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
);

-- departments
CREATE TABLE IF NOT EXISTS departments (
    departmentID INT PRIMARY KEY AUTO_INCREMENT,
    departmentName VARCHAR(50) NOT NULL UNIQUE,
    employeeCount SMALLINT NOT NULL DEFAULT 0
);

-- employees
CREATE TABLE IF NOT EXISTS employees (
    employeeID INT PRIMARY KEY AUTO_INCREMENT,
    employeeName VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    startDate DATETIME NOT NULL,
    country VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    age INT NOT NULL,
    departmentID INT NOT NULL,
    FOREIGN KEY (departmentID) REFERENCES departments(departmentID)
);

-- customers
CREATE TABLE IF NOT EXISTS customers (
    customerID VARCHAR(8) NOT NULL PRIMARY KEY,
    lastOrderID VARCHAR(14),
    customerName VARCHAR(50) NOT NULL,
    segment VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postalCode INT NOT NULL,
    region VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
    orderID VARCHAR(14) PRIMARY KEY,
    customerID VARCHAR(8) NOT NULL,
    employeeID INT NOT NULL,
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

ALTER TABLE customers
ADD CONSTRAINT fk_lastOrderID FOREIGN KEY (lastOrderID) REFERENCES orders(orderID);




