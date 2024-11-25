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

# READ CATEGORIES

# READ CATEGORY BY ID

# UPDATE CATEGORY

# DELETE CATEGORY


# ***************** EMPLOYEES *****************

# CREATE EMPLOYEE

# READ EMPLOYEES

# READ EMPLOYEE BY ID

# UPDATE EMPLOYEE

# DELETE EMPLOYEE


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
@app.route('/api/orderDetails', methods=['POST'])
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
@app.route('/api/orderDetails', methods=['GET'])
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
@app.route('/api/orderDetails/<string:orderID>', methods=['GET'])
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

# UPDATE ORDER DETAIL
@app.route('/api/orderDetails/<string:orderID>', methods=['PUT'])
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
@app.route('/api/orderDetails/<string:orderID>', methods=['DELETE'])
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
    app.run(debug=True, port=8080)
    