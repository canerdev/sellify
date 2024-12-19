DROP DATABASE IF EXISTS sellify;
CREATE DATABASE sellify;
USE sellify;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    status BOOLEAN NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id VARCHAR(15) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(19, 4) NOT NULL,
    categoryID INT NOT NULL,
    stockCount INT NOT NULL,
    lastSold DATE,
    FOREIGN KEY (categoryID) REFERENCES categories(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    employeeCount INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL,
    salary DECIMAL(19, 4) NOT NULL,
    age INT NOT NULL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES departments(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
    id VARCHAR(8) NOT NULL PRIMARY KEY,
    segment VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postalCode INT NOT NULL,
    region VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    lastOrderID VARCHAR(14) DEFAULT NULL,
    CHECK (email LIKE '%_@%_.%')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id VARCHAR(14) PRIMARY KEY,
    customerID VARCHAR(8) NOT NULL,
    employeeID INT,
    orderDate DATE NOT NULL,
    paymentMethod VARCHAR(20) NOT NULL,
    trackingNumber VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'active',
    FOREIGN KEY (customerID) REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES employees(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS shipmentModes;
CREATE TABLE shipmentModes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    estimatedTime VARCHAR(100) NOT NULL,
    cost INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS shippingDetails;
CREATE TABLE shippingDetails (
    orderID VARCHAR(14) NOT NULL,
    shipmentModeID INT,
    shippingDate DATE NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postalCode VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (shipmentModeID) REFERENCES shipmentModes(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (orderID) REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS orderDetails;
CREATE TABLE orderDetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderID VARCHAR(14) NOT NULL,
    productID VARCHAR(15),
    amount DECIMAL(19, 4) NOT NULL,
    quantity INT NOT NULL,
    discount DECIMAL(19, 4) NOT NULL,
    profit DECIMAL(19, 4) NOT NULL,
    FOREIGN KEY (orderID) REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES products(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
