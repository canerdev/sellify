import pandas as pd
import mysql.connector
from datetime import datetime

def createSchema(cursor):
    try:
        with open('schema.sql', 'r') as file:
            sql_file = file.read()
            
            # remove any commented lines
            sql_commands = []
            for line in sql_file.splitlines():
                # Skip comments and empty lines
                if not line.startswith('--') and line.strip():
                    sql_commands.append(line)
            
            sql_file = ' '.join(sql_commands)
            sql_commands = sql_file.split(';')
            
            # execute queries
            for command in sql_commands:
                command = command.strip()
                if command:
                    try:
                        cursor.execute(command)
                    except Exception as e:
                        print(f"Error executing command {command[:50]}...: {str(e)}")
                    
        print("Finished creating database and table schemas")
    except Exception as e:
        print(f"Error with SQL file: {str(e)}")


def loadCategories(cursor):
    try:
        df = pd.read_csv("data/tables/categories.csv")
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO categories (name, description, status)
            VALUES (%s, %s, %s)
            """
            values = (
                row['name'],
                row['description'],
                row['status'] if 'status' in row else 1
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted categories table")
    except Exception as e:
        print(f"Error loading categories: {str(e)}")


def loadProducts(cursor):
    try:
        df = pd.read_csv("data/tables/products.csv")
        df['lastSold'] = pd.to_datetime(df['lastSold'], format='%d/%m/%Y').dt.strftime('%Y-%m-%d')
        df['price'] = df['price'].astype(str).str.replace('"', '').str.replace(',', '.')

        for _, row in df.iterrows():
            try:
                insert_query = """
                INSERT INTO products (id, name, price, categoryID, stockCount, lastSold)
                VALUES (%s, %s, %s, %s, %s, %s)
                """
                values = (
                    row['id'],
                    row['name'],
                    float(row['price']),
                    row['categoryID'],
                    row['stockCount'],
                    row['lastSold']  # Use row['lastSold'] instead of df['lastSold']
                )
                cursor.execute(insert_query, values)
            except ValueError as ve:
                print(f"Error processing product {row['id']}: {ve}")
                print(f"Problem row: {row}")
                continue
        print(f"Successfully inserted products table")
    except Exception as e:
        print(f"Error loading products: {str(e)}")


def loadDepartments(cursor):
    try:
        df = pd.read_csv("data/tables/departments.csv")
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO departments (name, employeeCount)
            VALUES (%s, %s)
            """
            values = (
                str(row['name']),
                int(row['employeeCount'])
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted departments table")
    except Exception as e:
        print(f"Error loading departments: {str(e)}")


def loadEmployees(cursor):
    try:
        df = pd.read_csv("data/tables/employees.csv")
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO employees (name, gender, country, salary, age, departmentID)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            values = (
                str(row['name']),
                str(row['gender']),
                str(row['country']),
                float(row['salary']),
                int(row['age']),
                int(row['departmentID'])
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted employees table")
    except Exception as e:
        print(f"Error loading employees: {str(e)}")


def loadCustomers(cursor):
    try:
        # Drop the foreign key constraint temporarily
        # cursor.execute("ALTER TABLE customers DROP FOREIGN KEY fk_lastOrderID")

        df = pd.read_csv("data/tables/customers.csv")
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO customers (id, segment, name, country, city, state, postalCode, region, email, phone, lastOrderID)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                row['id'],
                row['segment'],
                row['name'],
                row['country'],
                row['city'],
                row['state'],
                row['postalCode'],
                row['region'],
                row['email'],
                row['phone'],
                row['lastOrderID']
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted customers table")
        
        # Add the foreign key constraint back after loading all data
        print("Successfully restored foreign key constraint")
        
    except Exception as e:
        print(f"Error loading customers: {str(e)}")    


def loadOrders(cursor):
    try:
        df = pd.read_csv("data/tables/orders.csv")
        df['orderDate'] = pd.to_datetime(df['orderDate'], format='%d/%m/%Y').dt.strftime('%Y-%m-%d')

        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO orders (id, customerID, employeeID, orderDate, paymentMethod, trackingNumber, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                row['id'],
                row['customerID'],
                row['employeeID'],
                row['orderDate'],
                row['paymentMethod'],
                row['trackingNumber'],
                row['status'] if 'status' in row else 'active'
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted orders table")
        cursor.execute("ALTER TABLE customers ADD CONSTRAINT fk_lastOrderID FOREIGN KEY (lastOrderID) REFERENCES orders(id);")
    except Exception as e:
        print(f"Error loading orders: {str(e)}")


def loadShipmentModes(cursor):
    try:
        df = pd.read_csv("data/tables/shipmentModes.csv")
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO shipmentModes (name, description, estimatedTime, cost)
            VALUES (%s, %s, %s, %s)
            """
            values = (
                row['name'],
                row['description'],
                row['estimatedTime'],
                float(row['cost'])
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted shipmentModes table")
    except Exception as e:
        print(f"Error loading shipmentModes: {str(e)}")


def loadShippingDetails(cursor):
    try:
        df = pd.read_csv("data/tables/shippingDetails.csv")        
        df['shippingDate'] = pd.to_datetime(df['shippingDate'], format='%d/%m/%Y').dt.strftime('%Y-%m-%d')

        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO shippingDetails (orderID, shipmentModeID, shippingDate, 
                                       country, city, state, postalCode, region)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                row['orderID'],           
                row['shipmentModeID'],    
                row['shippingDate'],           
                row['country'],           
                row['city'],              
                row['state'],             
                row['postalCode'],        
                row['region']             
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted shippingDetails table")
    except Exception as e:
        print(f"Error loading shippingDetails: {str(e)}")


def loadOrderDetails(cursor):
    try:
        df = pd.read_csv("data/tables/orderDetails.csv")
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO orderDetails (orderID, productID, amount, 
                                    quantity, discount, profit)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            values = (
                row['orderID'],      
                row['productID'],    
                float(row['amount']),      
                row['quantity'],      
                float(row['discount']),    
                float(row['profit'])
            )
            cursor.execute(insert_query, values)
        print(f"Successfully inserted orderDetails table")
    except Exception as e:
        print(f"Error loading orderDetails: {str(e)}")


if __name__ == "__main__":
    try:
        # connect to host and create schemas
        cnx = mysql.connector.connect(
            user='username',
            password='password',
            host='hostname'
        )
        cursor = cnx.cursor()

        # create schema
        createSchema(cursor)
        cnx.commit()

        # close connections
        cursor.close()
        cnx.close()

        # connect to the database
        cnx = mysql.connector.connect(
            user='username',
            password='password',
            host='hostname',
            database='database_name'
        )
        cursor = cnx.cursor()

        # Load data in the correct order (due to foreign key constraints)
        loadCategories(cursor)
        loadDepartments(cursor)
        loadEmployees(cursor)
        loadProducts(cursor)
        loadCustomers(cursor)
        loadOrders(cursor)
        loadShipmentModes(cursor)
        loadShippingDetails(cursor)
        loadOrderDetails(cursor)

        # Commit all changes at once
        cnx.commit()

    except mysql.connector.Error as err:
        print(f"Database Error: {err}")
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'cnx' in locals():
            cnx.close()
        print("Connection closed")