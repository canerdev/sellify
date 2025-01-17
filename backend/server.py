from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta


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
    lastSold = data.get('lastSold', None)
    query = 'INSERT INTO products (id, name, price, cost, categoryID, stockCount, lastSold) VALUES (%s, %s, %s, %s, %s, %s, %s)'
    values = (data['id'], data['name'], data['price'], data['cost'], data['categoryID'], data['stockCount'], lastSold)

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


# GET PRODUCT BY FILTER
@app.route('/api/products/filter', methods=['GET'])
def get_products_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM products LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get products: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE PRODUCT
@app.route('/api/products/<string:id>', methods=['PUT'])
def update_product(id):
    data = request.json

    lastSold = data.get('lastSold', None)
    try:
        if lastSold:
            parsed_date = datetime.strptime(lastSold, '%a, %d %b %Y %H:%M:%S %Z')
            formatted_date = parsed_date.strftime('%Y-%m-%d')
        else:
            formatted_date = None
    except ValueError as e:
        return jsonify({'error': f'Failed to parse lastSold date: {str(e)}'}), 400
    
    query = 'UPDATE products SET id = %s, name = %s, price = %s, cost = %s, categoryID = %s, stockCount = %s, lastSold = %s WHERE id = %s'
    values = (data['id'], data['name'], data['price'], data['cost'] , data['categoryID'], data['stockCount'], formatted_date, id)

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

# GET NUMBER OF PRODUCTS
@app.route('/api/products/count', methods=['GET'])
def get_products_count():
    query = 'SELECT COUNT(*) as count FROM products'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get products count{str(e)}'}), 500
    finally:
        connection.close()

# GET PRODUCTS BY IN THE CURRENT ORDER
@app.route('/api/products/current-order/<string:orderID>', methods=['GET'])
def get_products_current_order(orderID):
    # | id | name| price    | cost     | categoryID | stockCount | lastSold   |
    query = """
        SELECT productID, categoryID, name, price, stockCount, cost, lastSold
        FROM orderdetails 
        LEFT JOIN products 
        ON orderdetails.productID = products.id 
        WHERE orderID = %s
    """
    values = (orderID,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get products: {str(e)}'}), 500
    finally:
        connection.close()

# ***************** CUSTOMERS *****************

# CREATE CUSTOMER
@app.route('/api/customers', methods=['POST'])
def create_customer():
    data = request.json
    last_order_id = data.get('lastOrderID', None)
    query = 'INSERT INTO customers (id, segment, name, country, city, state, postalCode, region, email, phone, lastOrderID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    values = (data['id'], data['segment'], data['name'], data['country'], data['city'], data['state'], data['postalCode'], data['region'], data['email'], data['phone'], last_order_id)

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

# GET CUSTOMER BY FILTER
@app.route('/api/customers/filter', methods=['GET'])
def get_customers_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM customers LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get customers: {str(e)}'}), 500
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

# GET NUMBER OF CUSTOMERS
@app.route('/api/customers/count', methods=['GET'])
def get_customers_count():
    query = 'SELECT COUNT(*) as count FROM customers'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get customers count{str(e)}'}), 500
    finally:
        connection.close()



# ***************** ORDERS *****************

# CREATE ORDER
@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    query_insert = 'INSERT INTO orders (id, customerID, employeeID, orderDate, paymentMethod, trackingNumber, status) VALUES (%s, %s, %s, %s, %s, %s, %s)'
    query_update = 'UPDATE customers SET lastOrderID = %s WHERE id = %s'

    values_insert = (data['id'], data['customerID'], data['employeeID'], data['orderDate'], data['paymentMethod'], data['trackingNumber'], data['status'])
    values_update = (data['id'], data['customerID'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query_insert, values_insert)
            cursor.execute(query_update, values_update)
            connection.commit()
        return jsonify({'message': 'Order created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create order{str(e)}'}), 500
    finally:
        connection.close()

# READ ORDERS
@app.route('/api/orders', methods=['GET'])
def get_orders():
    query = 'SELECT * FROM orders'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get orders{str(e)}'}), 500
    finally:
        connection.close()

# READ ORDER BY ID
@app.route('/api/orders/<string:id>', methods=['GET'])
def get_order(id):
    query = 'SELECT * FROM orders WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get order{str(e)}'}), 500
    finally:
        connection.close()

# GET ORDER BY FILTER
@app.route('/api/orders/filter', methods=['GET'])
def get_orders_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM orders LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get orders: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE ORDER
@app.route('/api/orders/<string:id>', methods=['PUT'])
def update_order(id):
    data = request.json
    query = 'UPDATE orders SET customerID = %s, employeeID = %s, orderDate = %s, paymentMethod = %s, trackingNumber = %s, status = %s WHERE id = %s'
    values = (data['customerID'], data['employeeID'], data['orderDate'], data['paymentMethod'], data['trackingNumber'], data['status'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Order updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update order{str(e)}'}), 500
    finally:
        connection.close()

# DELETE ORDER
@app.route('/api/orders/<string:id>', methods=['DELETE'])
def delete_order(id):
    get_customer_query = 'SELECT customerID FROM orders WHERE id = %s'
    delete_order_query = 'DELETE FROM orders WHERE id = %s'
    get_latest_order_query = 'SELECT id FROM orders WHERE customerID = %s ORDER BY orderDate DESC LIMIT 1'
    update_customer_query = 'UPDATE customers SET lastOrderID = %s WHERE id = %s'

    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(get_customer_query, values)
            customer = cursor.fetchone()
            if customer is None:
                return jsonify({'error': 'Order not found'}), 404
            
            customer_id = customer['customerID']
            cursor.execute(delete_order_query, values)
            cursor.execute(get_latest_order_query, (customer_id,))
            latest_order = cursor.fetchone()

            if latest_order is None:
                cursor.execute(update_customer_query, (None, customer_id))
            else:
                cursor.execute(update_customer_query, (latest_order['id'], customer_id))

            connection.commit()
        return jsonify({'message': 'Order deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete order{str(e)}'}), 500
    finally:
        connection.close()

# GET NUMBER OF ORDERS
@app.route('/api/orders/count', methods=['GET'])
def get_orders_count():
    query = 'SELECT COUNT(*) as count FROM orders'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get orders count{str(e)}'}), 500
    finally:
        connection.close()

# GET TRACKING NUMBERS
@app.route('/api/orders/tracking-numbers', methods=['GET'])
def get_tracking_numbers():
    query = 'SELECT trackingNumber FROM orders'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get tracking numbers{str(e)}'}), 500
    finally:
        connection.close()
        
# ***************** DEPARTMENTS *****************

# CREATE DEPARTMENT
@app.route('/api/departments', methods=['POST'])
def create_department():
    data = request.json
    department_name = data['name']
    query = 'INSERT INTO departments (name, employeeCount) VALUES (%s, %s)'
    values = (department_name, 0)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Department created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create department{str(e)}'}), 500
    finally:
        connection.close()

# READ DEPARTMENTS
@app.route('/api/departments', methods=['GET'])
def get_departments():
    query = 'SELECT * FROM departments'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get departments{str(e)}'}), 500
    finally:
        connection.close()

# READ DEPARTMENT BY ID
@app.route('/api/departments/<int:id>', methods=['GET'])
def get_department(id):
    query = 'SELECT * FROM departments WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get department{str(e)}'}), 500
    finally:
        connection.close()


# GET DEPARTMENT BY FILTER
@app.route('/api/departments/filter', methods=['GET'])
def get_departments_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM departments LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get departments: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE DEPARTMENT
@app.route('/api/departments/<int:id>', methods=['PUT'])
def update_department(id):
    data = request.json
    query = 'UPDATE departments SET name = %s, employeeCount = %s WHERE id = %s'
    values = (data['name'], data['employeeCount'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Department updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update department{str(e)}'}), 500
    finally:
        connection.close()

# DELETE DEPARTMENT
@app.route('/api/departments/<int:id>', methods=['DELETE'])
def delete_department(id):
    query = 'DELETE FROM departments WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Department deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete department{str(e)}'}), 500
    finally:
        connection.close()

# GET NUMBER OF DEPARTMENTS
@app.route('/api/departments/count', methods=['GET'])
def get_departments_count():
    query = 'SELECT COUNT(*) as count FROM departments'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get departments count{str(e)}'}), 500
    finally:
        connection.close()

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


# GET CATEGORY BY FILTER
@app.route('/api/categories/filter', methods=['GET'])
def get_categories_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM categories LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get categories: {str(e)}'}), 500
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


# GET NUMBER OF CATEGORIES
@app.route('/api/categories/count', methods=['GET'])
def get_categories_count():
    query = 'SELECT COUNT(*) as count FROM categories'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get categories count'}), 500
    finally:
        connection.close()


# ***************** EMPLOYEES *****************

# CREATE EMPLOYEE
@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.json
    query_insert = '''
        INSERT INTO employees (name, gender, country, salary, age, departmentID) 
        VALUES (%s, %s, %s, %s, %s, %s)
    '''
    query_update = '''
        UPDATE departments SET employeeCount = employeeCount + 1 WHERE id = %s
    '''
    
    values_insert = (data['name'], data['gender'], data['country'], data['salary'], data['age'], data['departmentID'])
    values_update = (data['departmentID'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query_insert, values_insert)
            cursor.execute(query_update, values_update)
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


# GET EMPLOYEE BY FILTER
@app.route('/api/employees/filter', methods=['GET'])
def get_employees_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM employees LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get employees: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE EMPLOYEE
@app.route('/api/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.json

    get_old_department_query = 'SELECT departmentID FROM employees WHERE id = %s'
    decrement_old_department_query = 'UPDATE departments SET employeeCount = employeeCount - 1 WHERE id = %s'
    increment_new_department_query = 'UPDATE departments SET employeeCount = employeeCount + 1 WHERE id = %s'
    update_employee_query = '''
        UPDATE employees 
        SET name = %s, gender = %s, country = %s, salary = %s, age = %s, departmentID = %s 
        WHERE id = %s
    '''

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(get_old_department_query, (id,))
            old_department = cursor.fetchone()

            if not old_department:
                return jsonify({'error': 'Employee not found'}), 404


            if old_department['departmentID'] != data['departmentID']:  
                cursor.execute(decrement_old_department_query, (old_department['departmentID'],))
                cursor.execute(increment_new_department_query, (data['departmentID'],))


            values = (data['name'], data['gender'], data['country'], data['salary'], data['age'], data['departmentID'], id)
            cursor.execute(update_employee_query, values)
            connection.commit()

        return jsonify({'message': 'Employee updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update employee: {str(e)}'}), 500
    finally:
        connection.close()


# DELETE EMPLOYEE
@app.route('/api/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    get_department_query = 'SELECT departmentID FROM employees WHERE id = %s'
    delete_emp_query = 'DELETE FROM employees WHERE id = %s'
    update_department_query = 'UPDATE departments SET employeeCount = employeeCount - 1 WHERE id = %s'

    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(get_department_query, values)
            deparment_id = cursor.fetchone()
            
            if deparment_id is None:
                return jsonify({'error': 'Employee not found'}), 404
            
            cursor.execute(delete_emp_query, values)
            cursor.execute(update_department_query, deparment_id['departmentID'])
            connection.commit()
        return jsonify({'message': 'Employee deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete employee: {str(e)}'}), 500
    finally:
        connection.close()

# GET NUMBER OF EMPLOYEES
@app.route('/api/employees/count', methods=['GET'])
def get_employees_count():
    query = 'SELECT COUNT(*) as count FROM employees'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get employees count'}), 500
    finally:
        connection.close()


# ***************** SHIPMENT MODES *****************
# CREATE SHIPMENT MODE
@app.route('/api/shipment-modes', methods=['POST'])
def create_shipment_mode():
    data = request.json
    description = data.get('description', None)
    query = 'INSERT INTO shipmentModes (name, description, estimatedTime, cost) VALUES (%s, %s, %s, %s)'
    values = (data['name'], description, data['estimatedTime'], data['cost'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Shipment mode created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create shipment mode{str(e)}'}), 500
    finally:
        connection.close()

# READ SHIPMENT MODES
@app.route('/api/shipment-modes', methods=['GET'])
def get_shipment_modes():
    query = 'SELECT * FROM shipmentModes'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get shipment modes'}), 500
    finally:
        connection.close()

# READ SHIPMENT MODE BY ID
@app.route('/api/shipment-modes/<int:id>', methods=['GET'])
def get_shipment_mode(id):
    query = 'SELECT * FROM shipmentModes WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Shipment mode not found'}), 404
    except Exception as e:
        return jsonify({'error': f'Failed to get shipment mode: {str(e)}'}), 500
    finally:
        connection.close()

# GET SHIPMENT MODE BY FILTER
@app.route('/api/shipment-modes/filter', methods=['GET'])
def get_shipment_modes_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM shipmentModes LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get shipment modes: {str(e)}'}), 500
    finally:
        connection.close()


# UPDATE SHIPMENT MODE
@app.route('/api/shipment-modes/<int:id>', methods=['PUT'])
def update_shipment_mode(id):
    data = request.json
    description = data.get('description', None)
    query = 'UPDATE shipmentModes SET name = %s, description = %s, estimatedTime = %s, cost = %s WHERE id = %s'
    values = (data['name'], description, data['estimatedTime'], data['cost'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Shipment mode updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update shipment mode: {str(e)}'}), 500
    finally:
        connection.close()

# DELETE SHIPMENT MODE
@app.route('/api/shipment-modes/<int:id>', methods=['DELETE'])
def delete_shipment_mode(id):
    query = 'DELETE FROM shipmentModes WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Shipment mode deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete shipment mode: {str(e)}'}), 500
    finally:
        connection.close()

# GET NUMBER OF SHIPMENT MODES
@app.route('/api/shipment-modes/count', methods=['GET'])
def get_shipment_modes_count():
    query = 'SELECT COUNT(*) as count FROM shipmentModes'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get shipment modes count'}), 500
    finally:
        connection.close()


# ***************** SHIPPING DETAILS *****************

# CREATE SHIPPING DETAIL
@app.route('/api/shipping-details', methods=['POST'])
def create_shipping_detail():
    data = request.json #orderID,shipmentModeID,shippingDate,country,city,state,postalCode,region
    query = 'INSERT INTO shippingDetails (orderID, shipmentModeID, shippingDate, country, city, state, postalCode, region) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)'
    values = (data['orderID'], data['shipmentModeID'], data['shippingDate'], data['country'], data['city'], data['state'], data['postalCode'], data['region'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Shipping detail created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create shipping detail{str(e)}'}), 500
    finally:
        connection.close()

# READ SHIPPING DETAILS
@app.route('/api/shipping-details', methods=['GET'])
def get_shipping_details():
    query = 'SELECT * FROM shippingDetails'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get shipping details{str(e)}'}), 500
    finally:
        connection.close()

# READ SHIPPING DETAIL BY ID
@app.route('/api/shipping-details/<string:orderID>', methods=['GET'])
def get_shipping_detail(orderID):
    query = 'SELECT * FROM shippingDetails WHERE orderID = %s'
    values = (orderID,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get shipping detail{str(e)}'}), 500
    finally:
        connection.close()

# GET SHIPPING DETAIL BY FILTER
@app.route('/api/shipping-details/filter', methods=['GET'])
def get_shipping_details_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM shippingDetails LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get shipping details: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE SHIPPING DETAIL
@app.route('/api/shipping-details/<string:orderID>', methods=['PUT'])
def update_shipping_detail(orderID):
    data = request.json
    query = 'UPDATE shippingDetails SET shipmentModeID = %s, shippingDate = %s, country = %s, city = %s, state = %s, postalCode = %s, region = %s WHERE orderID = %s'
    values = (data['shipmentModeID'], data['shippingDate'], data['country'], data['city'], data['state'], data['postalCode'], data['region'], orderID)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Shipping detail updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update shipping detail{str(e)}'}), 500
    finally:
        connection.close()

# DELETE SHIPPING DETAIL
@app.route('/api/shipping-details/<string:orderID>', methods=['DELETE'])
def delete_shipping_detail(orderID):
    query = 'DELETE FROM shippingDetails WHERE orderID = %s'
    values = (orderID,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Shipping detail deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete shipping detail{str(e)}'}), 500
    finally:
        connection.close()

# GET SHIPPING DETAILS COUNT
@app.route('/api/shipping-details/count', methods=['GET'])
def get_shipping_details_count():
    query = 'SELECT COUNT(*) as count FROM shippingDetails'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Failed to get shipping details count'}), 500
    finally:
        connection.close()


# ***************** ORDER DETAILS *****************

# CREATE ORDER DETAIL
@app.route('/api/order-details', methods=['POST'])
def create_order_detail():
    data = request.json
    
    query_insert = 'INSERT INTO orderDetails (orderID, productID, amount, quantity, discount, profit) VALUES (%s, %s, %s, %s, %s, %s)'
    update_stock = 'UPDATE products SET stockCount = stockCount - %s WHERE id = %s'
    update_lastsold = 'UPDATE products SET lastSold = %s WHERE id = %s'

    values_insert = (data['orderID'], data['productID'], data['amount'], data['quantity'], data['discount'], data['profit'])
    update_stock_values = (data['quantity'], data['productID'])
    update_lastsold_values = (data['orderDate'], data['productID']) # orderDate should be retrieved from the request

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query_insert, values_insert)
            cursor.execute(update_stock, update_stock_values)
            cursor.execute(update_lastsold, update_lastsold_values)
            connection.commit()
        return jsonify({'message': 'Order detail created successfully!'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create order detail{str(e)}'}), 500
    finally:
        connection.close()

# READ ORDER DETAILS
@app.route('/api/order-details', methods=['GET'])
def get_order_details():
    query = 'SELECT * FROM orderDetails'
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get order details{str(e)}'}), 500
    finally:
        connection.close()

# READ ORDER DETAIL BY ID
@app.route('/api/order-details/<string:orderID>', methods=['GET'])
def get_order_detail(orderID):
    query = 'SELECT * FROM orderDetails WHERE orderID = %s'
    values = (orderID,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get order detail{str(e)}'}), 500
    finally:
        connection.close()

# GET ORDER DETAIL BY FILTER
@app.route('/api/order-details/filter', methods=['GET'])
def get_order_details_by_filter():
    offset = request.args.get('offset', default=0, type=int)
    limit = request.args.get('limit', default=10, type=int)
    query = 'SELECT * FROM orderDetails LIMIT %s OFFSET %s'
    values = (limit, offset)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to get order details: {str(e)}'}), 500
    finally:
        connection.close()

# UPDATE ORDER DETAIL
@app.route('/api/order-details/<int:id>', methods=['PUT'])
def update_order_detail(id):
    data = request.json
    product_id = data['productID']
    new_quantity = data['quantity']

    current_quantity_query = 'SELECT quantity FROM orderDetails WHERE id = %s'
    query = 'UPDATE orderDetails SET productID = %s, amount = %s, quantity = %s, discount = %s, profit = %s WHERE id = %s'
    values = (data['productID'], data['amount'], data['quantity'], data['discount'], data['profit'], id)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(current_quantity_query, id)
            current_quantity = cursor.fetchone()
            if not current_quantity:
                return jsonify({'error': 'Order detail not found'}), 404
            
            cur_qu = current_quantity['quantity']
            if cur_qu > new_quantity:
                diff = cur_qu - new_quantity
                cursor.execute('UPDATE products SET stockCount = stockCount + %s WHERE id = %s', (diff, product_id))
            elif cur_qu < new_quantity:
                diff = new_quantity - cur_qu
                cursor.execute('UPDATE products SET stockCount = stockCount - %s WHERE id = %s', (diff, product_id))


            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Order detail updated successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to update order detail{str(e)}'}), 500
    finally:
        connection.close()

# DELETE ORDER DETAIL
@app.route('/api/order-details/<string:orderID>', methods=['DELETE'])
def delete_order_detail(orderID):
    query = 'DELETE FROM orderDetails WHERE orderID = %s'
    values = (orderID,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Order detail deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete order detail{str(e)}'}), 500
    finally:
        connection.close()

# ***************** CUSTOM QUERIES FOR CHARTS *****************
# GET TOTAL PROFIT BY PRODUCT CATEGORY IN THE LAST 30 DAYS
@app.route('/api/total-profit-by-category', methods=['GET'])
def get_total_profit_by_category():
    end_date = datetime(2014, 12, 31) # should be updated to the current date
    start_date = end_date - timedelta(days=30) 

    query = """
    SELECT 
        categories.name,
        SUM(profit) AS total_profit
    FROM 
        orders
    JOIN 
        orderdetails ON orders.id = orderdetails.orderid
    JOIN 
        products ON products.id = orderdetails.productid
    JOIN 
        categories ON categories.id = products.categoryID
    WHERE 
        orderDate BETWEEN %s AND %s
    GROUP BY 
        categories.name
    ORDER BY 
        total_profit DESC
    """
    
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')))
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500
    finally:
        connection.close()

# GET TOTAL PROFIT BY DAY 
@app.route('/api/total-profit-by-day', methods=['GET'])
def get_total_profit_by_day():
    end_date = datetime(2014, 12, 31)
    start_date = end_date - timedelta(days=30) 

    query = """
    SELECT 
        orderDate, 
        SUM(profit) as total_profit
    FROM 
        orders
    JOIN 
        orderdetails ON orders.id = orderdetails.orderid
    WHERE 
        orderDate BETWEEN %s AND %s
    GROUP BY 
        orderDate
    ORDER BY 
        orderDate
    """
    
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')))
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500
    finally:
        connection.close()


# BEST SELLING PRODUCTS IN THE LAST 30 DAYS
@app.route('/api/best-selling-products', methods=['GET'])
def get_best_selling_products():
    end_date = datetime(2014, 12, 31)
    start_date = end_date - timedelta(days=30) 

    query = """
    SELECT 
        products.name,
        SUM(quantity) as total_quantity
    FROM 
        orders
    JOIN 
        orderDetails ON orders.id = orderDetails.orderid
    JOIN 
        products ON products.id = orderDetails.productid
    WHERE 
        orderDate BETWEEN %s AND %s
    GROUP BY 
        products.name
    ORDER BY 
        total_quantity DESC
    LIMIT 10
    """
    
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d')))
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500
    finally:
        connection.close()
        

# DISTRIBUTION OF CUSTOMERS BY REGION
@app.route('/api/customer-distribution-by-region', methods=['GET'])
def get_customer_distribution_by_region():
    query = """
    SELECT 
        region,
        state,
        COUNT(*) AS count,
        SUM(COUNT(*)) OVER (PARTITION BY region) as totalCustomersInRegion
    FROM 
        customers
    GROUP BY 
        region,state
    ORDER BY 
        count DESC
    """
    
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500
    finally:
        connection.close()

# GET PRODUCTS WITH LOW STOCK
@app.route('/api/low-stock/<lower_than>', methods=['GET'])
def get_low_stock_products(lower_than):
    query = """
    SELECT products.id, products.name, stockCount, lastSold, categories.name 
    FROM products
    JOIN categories ON products.categoryID = categories.id
    WHERE stockCount < %s
    ORDER BY stockCount 
    """
    
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (lower_than,))
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500
    finally:
        connection.close()

# GET THE COLUMN INFORMATION OF A TABLE
@app.route('/api/columns/<string:table_name>', methods=['GET'])
def get_columns(table_name):    
    query = """
        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, EXTRA
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = %s
        AND TABLE_NAME = %s;
    """
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (os.getenv('DB_NAME'), table_name))
            result = cursor.fetchall()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch data: {str(e)}'}), 500
    finally:
        connection.close()

@app.route('/api/<table_name>', methods=['POST'])
def create_record(table_name):
    data = request.json
    try:
        columns = ", ".join(data.keys())
        placeholders = ", ".join(["%s"] * len(data))
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

        values = tuple(data.values())

        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()

        return jsonify({'message': f'Record added to {table_name} successfully!'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

@app.route("/")
def homepage():
    return jsonify({'message': 'Hello World!'})

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)
# app.debug = True