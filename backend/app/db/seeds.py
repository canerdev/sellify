import pandas as pd
import pymysql
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

def get_db_connection():
    return pymysql.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        database=db_config['database'],
        cursorclass=pymysql.cursors.DictCursor
    )

def createSchema(cursor):
    try:
        with open('schema.sql', 'r') as file:
            sql_file = file.read()
            
            sql_commands = []
            for line in sql_file.splitlines():
                if not line.startswith('--') and line.strip():
                    sql_commands.append(line)
            
            sql_file = ' '.join(sql_commands)
            sql_commands = sql_file.split(';')
            
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
        df = pd.read_csv("data/tables/products.csv", quotechar='"', skipinitialspace=True)

        df['lastSold'] = pd.to_datetime(df['lastSold'], format='%Y-%m-%d', errors='coerce')
        
        
        df['price'] = df['price'].astype(str).str.replace('"', '').str.replace(',', '.').astype(float)
        df['cost'] = df['cost'].astype(str).str.replace('"', '').str.replace(',', '.').astype(float)

        for _, row in df.iterrows():
            try:
                insert_query = """
                INSERT INTO products (id, name, price, cost, categoryID, stockCount, lastSold)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                values = (
                    row['id'],
                    row['name'],
                    row['price'],
                    row['cost'],
                    row['categoryID'],
                    row['stockCount'],
                    row['lastSold']
                )
                cursor.execute(insert_query, values)
            except ValueError as ve:
                print(f"Error processing product {row['id']}: {ve}")
                print(f"Problem row: {row}")
                continue
        print("Successfully inserted products table")
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
        cnx = pymysql.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            cursorclass=pymysql.cursors.DictCursor
        )
        
        with cnx.cursor() as cursor:
            createSchema(cursor)
            cnx.commit()
        
        cnx.close()

        cnx = pymysql.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            database=db_config['database'],
            cursorclass=pymysql.cursors.DictCursor
        )
        
        with cnx.cursor() as cursor:
            loadCategories(cursor)
            cnx.commit()
            
            loadDepartments(cursor)
            cnx.commit()
            
            loadEmployees(cursor)
            cnx.commit()
            
            loadProducts(cursor)
            cnx.commit()
            
            loadCustomers(cursor)
            cnx.commit()
            
            loadOrders(cursor)
            cnx.commit()
            
            loadShipmentModes(cursor)
            cnx.commit()
            
            loadShippingDetails(cursor)
            cnx.commit()
            
            loadOrderDetails(cursor)
            cnx.commit()

        
            query = """
            ALTER TABLE customers
            DROP FOREIGN KEY fk_lastOrderID;
            """
            try:
                with cnx.cursor() as cursor:
                    cursor.execute(query)
                    cnx.commit()
            except pymysql.Error as err:
                print(f"Error dropping fk_lastOrderID constraint: {err}")
            
            query = """
            ALTER TABLE customers
            ADD CONSTRAINT fk_lastOrderID
            FOREIGN KEY (lastOrderID) REFERENCES orders(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE;
            """
            try:
                with cnx.cursor() as cursor:
                    cursor.execute(query)
                    cnx.commit()
            except pymysql.Error as err:
                print(f"Error executing fk_lastOrderID constraint: {err}")

    except pymysql.Error as err:
        print(f"Database Error: {err}")
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        if 'cnx' in locals():
            cnx.close()
            print("Connection closed")
