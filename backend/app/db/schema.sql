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

CREATE TABLE IF NOT EXISTS Categories (
    categoryID SMALLINT PRIMARY KEY AUTOINCREMENT,
    categoryName VARCHAR(50) NOT NULL,
    subCategory VARCHAR(50) NOT NULL,
    categoryDescription TEXT,
    activeStatus TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS employees (
    employeeID SMALLINT PRIMARY KEY AUTOINCREMENT,
    employeeName VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    startDate DATETIME NOT NULL,
    country VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    age INT NOT NULL,
    departmentID SMALLINT NOT NULL,
    FOREIGN KEY (departmentID) REFERENCES departments(departmentID)
);