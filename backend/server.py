from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from dotenv import load_dotenv
import os


load_dotenv()


app = Flask(__name__)
CORS(app)

db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

def get_db_connection():
    connection = pymysql.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        database=db_config['database'],
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({'message': 'Hello World!'})


# ------------- CRUD OPERATIONS -------------


# ***************** PRODUCTS *****************

# CREATE PRODUCT
@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json
    query = 'INSERT INTO products (id, name, price, categoryID, stockCount, lastSold) VALUES (%s, %s, %s, %s, %s, %s)'
    values = (data['id'], data['name'], data['price'], data['categoryID'], data['stockCount'], data['lastSold'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Product created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create product{str(e)}'}), 500
    finally:
        connection.close()

# READ PRODUCTS
@app.route('/api/products', methods=['GET'])
def get_products():
    query = 'SELECT * FROM products'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get products'}), 500
    finally:
        connection.close()

# READ PRODUCT BY ID
@app.route('/api/products/<string:id>', methods=['GET'])
def get_product(id):
    query = 'SELECT * FROM products WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get product{str(e)}'}), 500
    finally:
        connection.close()

# UPDATE PRODUCT
@app.route('/api/products/<string:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    query = 'UPDATE products SET id = %s, name = %s, price = %s, categoryID = %s, stockCount = %s, lastSold = %s WHERE id = %s'
    values = (data['id'], data['name'], data['price'], data['categoryID'], data['stockCount'], data['lastSold'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Product updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update product{str(e)}'}), 500
    finally:
        connection.close()

# DELETE PRODUCT
@app.route('/api/products/<string:id>', methods=['DELETE'])
def delete_product(id):
    query = 'DELETE FROM products WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Product deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete product{str(e)}'}), 500
    finally:
        connection.close()


# ***************** CUSTOMERS *****************

# CREATE CUSTOMER
@app.route('/api/customers', methods=['POST'])
def create_customer():
    data = request.json
    query = 'INSERT INTO customers (id, segment, name, country, city, state, postalCode, region, email, phone, lastOrderID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    values = (data['id'], data['segment'], data['name'], data['country'], data['city'], data['state'], data['postalCode'], data['region'], data['email'], data['phone'], data['lastOrderID'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Customer created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create customer{str(e)}'}), 500
    finally:
        connection.close()

# READ CUSTOMERS
@app.route('/api/customers', methods=['GET'])
def get_customers():
    query = 'SELECT * FROM customers'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get customers{str(e)}'}), 500
    finally:
        connection.close()

# READ CUSTOMER BY ID
@app.route('/api/customers/<string:id>', methods=['GET'])
def get_customer(id):
    query = 'SELECT * FROM customers WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get customer{str(e)}'}), 500
    finally:
        connection.close()

# UPDATE CUSTOMER
@app.route('/api/customers/<string:id>', methods=['PUT'])
def update_customer(id):
    data = request.json
    query = 'UPDATE customers SET id = %s, segment = %s, name = %s, country = %s, city = %s, state = %s, postalCode = %s, region = %s, email = %s, phone = %s, lastOrderID = %s WHERE id = %s'
    values = (data['id'], data['segment'], data['name'], data['country'], data['city'], data['state'], data['postalCode'], data['region'], data['email'], data['phone'], data['lastOrderID'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Customer updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update customer{str(e)}'}), 500
    finally:
        connection.close()

# DELETE CUSTOMER
@app.route('/api/customers/<string:id>', methods=['DELETE'])
def delete_customer(id):
    query = 'DELETE FROM customers WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Customer deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete customer{str(e)}'}), 500
    finally:
        connection.close()


# ***************** ORDERS *****************

# CREATE ORDER

# READ ORDERS

# READ ORDER BY ID

# UPDATE ORDER

# DELETE ORDER


# ***************** DEPARTMENTS *****************

# CREATE DEPARTMENT

# READ DEPARTMENTS

# READ DEPARTMENT BY ID

# UPDATE DEPARTMENT

# DELETE DEPARTMENT


# ***************** CATEGORIES *****************

# CREATE CATEGORY
@app.route('/api/categories', methods=['POST'])
def create_category():
    data = request.json
    query = 'INSERT INTO categories (name, description, status) VALUES (%s, %s, %s)'
    values = (data['name'], data.get('description', None), data.get('status', 1))

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Category created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create category: {str(e)}'}), 500
    finally:
        connection.close()

# READ CATEGORIES
@app.route('/api/categories', methods=['GET'])
def get_categories():
    query = 'SELECT * FROM categories'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get categories'}), 500
    finally:
        connection.close()

# READ CATEGORY BY ID
@app.route('/api/categories/<int:id>', methods=['GET'])
def get_category(id):
    query = 'SELECT * FROM categories WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Category not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Failed to get category: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE CATEGORY
@app.route('/api/categories/<int:id>', methods=['PUT'])
def update_category(id):
    data = request.json
    query = 'UPDATE categories SET name = %s, description = %s, status = %s WHERE id = %s'
    values = (data['name'], data.get('description', None), data.get('status', 1), id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Category updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update category: {str(e)}'}), 500
    finally:
        connection.close()

# DELETE CATEGORY
@app.route('/api/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    query = 'DELETE FROM categories WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Category deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete category: {str(e)}'}), 500
    finally:
        connection.close()


# ***************** EMPLOYEES *****************

# CREATE EMPLOYEE
@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.json
    query = '''
        INSERT INTO employees (name, gender, country, salary, age, departmentID) 
        VALUES (%s, %s, %s, %s, %s, %s)
    '''
    values = (data['name'], data['gender'], data['country'], data['salary'], data['age'], data['departmentID'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Employee created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create employee: {str(e)}'}), 500
    finally:
        connection.close()

# READ EMPLOYEES
@app.route('/api/employees', methods=['GET'])
def get_employees():
    query = 'SELECT * FROM employees'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get employees'}), 500
    finally:
        connection.close()

# READ EMPLOYEE BY ID
@app.route('/api/employees/<int:id>', methods=['GET'])
def get_employee(id):
    query = 'SELECT * FROM employees WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Employee not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Failed to get employee: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE EMPLOYEE
@app.route('/api/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.json
    query = '''
        UPDATE employees 
        SET name = %s, gender = %s, country = %s, salary = %s, age = %s, departmentID = %s 
        WHERE id = %s
    '''
    values = (data['name'], data['gender'], data['country'], data['salary'], data['age'], data['departmentID'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Employee updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update employee: {str(e)}'}), 500
    finally:
        connection.close()

# DELETE EMPLOYEE
@app.route('/api/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    query = 'DELETE FROM employees WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Employee deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete employee: {str(e)}'}), 500
    finally:
        connection.close()


# ***************** SHIPMENT MODES *****************

# CREATE SHIPMENT MODE

# READ SHIPMENT MODES

# READ SHIPMENT MODE BY ID

# UPDATE SHIPMENT MODE

# DELETE SHIPMENT MODE


# ***************** SHIPPING DETAILS *****************

# CREATE SHIPPING DETAIL

# READ SHIPPING DETAILS

# READ SHIPPING DETAIL BY ID

# UPDATE SHIPPING DETAIL

# DELETE SHIPPING DETAIL


# ***************** ORDER DETAILS *****************

# CREATE ORDER DETAIL

# READ ORDER DETAILS

# READ ORDER DETAIL BY ID

# UPDATE ORDER DETAIL

# DELETE ORDER DETAIL


if __name__ == '__main__':
    app.run(debug=True, port=8080)
    