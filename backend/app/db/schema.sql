CREATE DATABASE IF NOT EXISTS sellify;
USE sellify;


-- categories
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(50) NOT NULL,
    subCategory VARCHAR(50) NOT NULL,
    categoryDescription TEXT,
    activeStatus BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- products
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    productID VARCHAR(15) NOT NULL PRIMARY KEY,
    categoryID INT NOT NULL,
    productName VARCHAR(100) NOT NULL,
    price DECIMAL(19, 4) NOT NULL,
    stockCount INT NOT NULL,
    lastSold DATE NOT NULL,
    FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- departments
DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    departmentID INT PRIMARY KEY AUTO_INCREMENT,
    departmentName VARCHAR(50) NOT NULL UNIQUE,
    employeeCount SMALLINT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- employees
DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    employeeID INT PRIMARY KEY AUTO_INCREMENT,
    employeeName VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    startDate DATETIME NOT NULL,
    country VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    age INT NOT NULL,
    departmentID INT NOT NULL,
    FOREIGN KEY (departmentID) REFERENCES departments(departmentID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- customers
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- orders
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- shipment modes
DROP TABLE IF EXISTS shipmentModes;
CREATE TABLE shipmentModes (
    shipModeID INT PRIMARY KEY AUTO_INCREMENT,
    shipModeName VARCHAR(50) NOT NULL UNIQUE,
    shipModeDescription TEXT,
    estimatedShippingTime SMALLINT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- shipping details
DROP TABLE IF EXISTS shippingDetails;
CREATE TABLE shippingDetails (
    shipModeId INT NOT NULL,
    orderID VARCHAR(14) NOT NULL,
    cost DECIMAL(11, 2) NOT NULL,
    shipDate DATETIME NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    shipmentState VARCHAR(50) NOT NULL,
    postalCode VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (shipModeId) REFERENCES shipmentModes(shipModeID),
    FOREIGN KEY (orderID) REFERENCES orders(orderID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE customers
ADD CONSTRAINT fk_lastOrderID FOREIGN KEY (lastOrderID) REFERENCES orders(orderID);




