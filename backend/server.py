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


# ***************** ORDERS *****************

# CREATE ORDER
@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    query = 'INSERT INTO orders (id, customerID, employeeID, orderDate, paymentMethod, trackingNumber, status) VALUES (%s, %s, %s, %s, %s, %s, %s)'
    values = (data['id'], data['customerID'], data['employeeID'], data['orderDate'], data['paymentMethod'], data['trackingNumber'], data['status'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
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
    query = 'DELETE FROM orders WHERE id = %s'
    values = (id,)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
            connection.commit()
        return jsonify({'message': 'Order deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to delete order{str(e)}'}), 500
    finally:
        connection.close()

# ***************** DEPARTMENTS *****************

# CREATE DEPARTMENT
@app.route('/api/departments', methods=['POST'])
def create_department():
    data = request.json
    query = 'INSERT INTO departments (name, employeeCount) VALUES (%s, %s)'
    values = (data['name'], data['employeeCount'])

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
    query = 'UPDATE shipmentModes SET name = %s, description = %s WHERE id = %s'
    values = (data['name'], data['description'], id)

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


# ***************** ORDER DETAILS *****************

# CREATE ORDER DETAIL
@app.route('/api/order-details', methods=['POST'])
def create_order_detail():
    data = request.json
    query = 'INSERT INTO orderDetails (orderID, productID, amount, quantity, discount, profit) VALUES (%s, %s, %s, %s, %s, %s)'
    values = (data['orderID'], data['productID'], data['amount'], data['quantity'], data['discount'], data['profit'])

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, values)
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
            result = cursor.fetchone()
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
@app.route('/api/order-details/<string:orderID>', methods=['PUT'])
def update_order_detail(orderID):
    data = request.json
    query = 'UPDATE orderDetails SET productID = %s, amount = %s, quantity = %s, discount = %s, profit = %s WHERE orderID = %s'
    values = (data['productID'], data['amount'], data['quantity'], data['discount'], data['profit'], orderID)

    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
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

@app.route("/")
def homepage():
  return 'Hello World!'


if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)
    