# Sellify

Sellify is a comprehensive order management system designed to streamline the process of managing orders, customers, and products. The application provides a user-friendly interface for creating, editing, and tracking orders, making it easier for businesses to manage their sales operations efficiently.

## Features

- **Order Management**: Create, edit, and view orders with detailed information.
- **Product Management**: View and manage products, including stock levels and pricing.
- **Customer Management**: Keep track of customers and their order history.
- **Dynamic Pagination**: Navigate through large datasets with ease using pagination controls.
- **Tracking Numbers**: Generate unique tracking numbers for each order, ensuring no duplicates.
- **Responsive Design**: The application is designed to be responsive and user-friendly on various devices.

## Technologies Used

- **Frontend**: React, Material UI, Next.js
- **Backend**: Python, Flask
- **Database**: MySQL
- **State Management**: React Hooks, Formik for form handling
- **API Integration**: Fetch API for data retrieval and manipulation

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/canerdev/sellify.git
   cd sellify
   ```

2. Install the dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install the dependencies for the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. Import data into the database:
   ```bash
   cd backend/app/db
   python seeds.py
   ```

5. Run the backend server:
   ```bash
   python server.py
   ```

6. Run the frontend application:
   ```bash
   npm run dev
   ```

## Usage

- Navigate to the application in your web browser (usually at `http://localhost:3000`).
- Use the navigation menu to access different features of the application.
- Create new orders, manage products, and view customer details as needed.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
