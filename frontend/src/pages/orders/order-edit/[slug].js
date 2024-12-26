import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import Layout from "@/pages/layout/Layout";
import { updateOrder, getOrderById } from "@/pages/api/orders";
import { useRouter } from "next/navigation";
import { getAllCustomers } from "@/pages/api/customers";
import { getAllUsers } from "@/pages/api/users";
import { getAllProducts } from "@/pages/api/products";
import Loading from "@/pages/loading";
import Select from "react-select";

export default function EditOrderForm({ order }) {
  console.log(order);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [initialValues, setInitialValues] = useState(order);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937", // Tailwind'deki bg-gray-800 rengi
      borderColor: "#4a5568", // Tailwind'deki border-gray-600 rengi
      color: "#e2e8f0", // Tailwind'deki text-gray-200 rengi
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937", // Menü arka planı için aynı renk
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937", // Seçilen değerlerin arka plan rengi
      color: "#e2e8f0", // Seçilen değerlerin metin rengi
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#e2e8f0", // Seçilen değerlerin etiket metin rengi
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#e2e8f0", // Çıkarma butonu rengi
      ":hover": {
        backgroundColor: "#4a5568", // Hover durumunda arka plan
        color: "#fff", // Hover durumunda metin rengi
      },
    }),
  };

  useEffect(() => {
    async function fetchData() {
      const customers = await getAllCustomers();
      const employees = await getAllUsers();
      const products = await getAllProducts();
      setCustomers(customers);
      setEmployees(employees);
      setProducts(products);
    }
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues || {
      id: "",
      customerID: "",
      employeeID: "",
      orderDate: "",
      paymentMethod: "",
      trackingNumber: "",
      status: "",
      productID: [],
      amount: "",
      quantity: "",
      discount: "",
      profit: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      id: Yup.string()
        .length(14, "Must be exactly 14 characters")
        .required("ID is required"),

      customerID: Yup.string().required("Customer ID is required"),
      employeeID: Yup.number(),
      orderDate: Yup.date().required("Order date is required"),
      paymentMethod: Yup.string()
        .max(20, "Max 20 characters")
        .required("Paymet Method is required"),
      trackingNumber: Yup.string()
        .max(10, "Max 10 characters")
        .required("Tracking Number is required"),
      status: Yup.string()
        .max(10, "Max 10 characters")
        .required("Status is required"),
      productID: Yup.array()
        .min(1, "At least one product must be selected")
        .required("Product ID is required"),
      amount: Yup.number().required("Amount is required"),
      quantity: Yup.number().required("Quantity is required"),
      discount: Yup.number().required("Discount is required"),
      profit: Yup.number().required("Profit is required"),
    }),

    onSubmit: debounce(async (values, { resetForm }) => {
      setLoading(true);
      await updateOrder(values);
      setLoading(false);
      router.push("/orders");
    }, 300),
  });

  if (!initialValues) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <form
          className="text-gray-200 flex flex-wrap gap-6"
          onSubmit={formik.handleSubmit}
        >
          {/* ID Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="id">ID*</label>
            <input
              type="text"
              name="id"
              id="id"
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
              disabled
            />
            {formik.touched.id && formik.errors.id ? (
              <div className="error-message">{formik.errors.id}</div>
            ) : null}
          </div>

          {/* Customer ID Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="customerID">Customer*</label>
            <select
              name="customerID"
              id="customerID"
              value={formik.values.customerID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            >
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            {formik.touched.customerID && formik.errors.customerID ? (
              <div className="error-message">{formik.errors.customerID}</div>
            ) : null}
          </div>

          {/* Employee ID Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="employeeID">Employee*</label>
            <select
              name="employeeID"
              id="employeeID"
              value={formik.values.employeeID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            {formik.touched.employeeID && formik.errors.employeeID ? (
              <div className="error-message">{formik.errors.employeeID}</div>
            ) : null}
          </div>

          {/* Order Date Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="orderDate">Order Date*</label>
            <input
              type="date"
              name="orderDate"
              id="orderDate"
              value={formik.values.orderDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.orderDate && formik.errors.orderDate && (
              <div className="error-message">{formik.errors.orderDate}</div>
            )}
          </div>

          {/* Payment Method Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="paymentMethod">Payment Method*</label>
            <input
              type="text"
              name="paymentMethod"
              id="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <div className="error-message">{formik.errors.paymentMethod}</div>
            )}
          </div>

          {/* Tracking Number Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="trackingNumber">Tracking Number*</label>
            <input
              type="text"
              name="trackingNumber"
              id="trackingNumber"
              value={formik.values.trackingNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.trackingNumber && formik.errors.trackingNumber && (
              <div className="error-message">
                {formik.errors.trackingNumber}
              </div>
            )}
          </div>

          {/* Status Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="status">Status*</label>
            <input
              type="text"
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.status && formik.errors.status && (
              <div className="error-message">{formik.errors.status}</div>
            )}
          </div>

          {/* Product ID Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="productID">Products*</label>
            <Select
              id="productID"
              name="productID"
              isMulti
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
              value={
                Array.isArray(formik.values.productID)
                  ? formik.values.productID.map((id) => {
                      const product = products.find((p) => p.id === id);
                      return { value: id, label: product?.name };
                    })
                  : []
              }
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions.map(
                  (option) => option.value
                );
                formik.setFieldValue("productID", selectedIds);
              }}
              onBlur={formik.handleBlur}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={customStyles}
            />
            {formik.touched.productID && formik.errors.productID ? (
              <div className="error-message">{formik.errors.productID}</div>
            ) : null}
          </div>

          {/* Amount Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="amount">Amount*</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="error-message">{formik.errors.amount}</div>
            ) : null}
          </div>

          {/* Quantity Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="quantity">Quantity*</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="error-message">{formik.errors.quantity}</div>
            ) : null}
          </div>

          {/* Discount Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="discount">Discount*</label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="error-message">{formik.errors.discount}</div>
            ) : null}
          </div>

          {/* Profit Field */}
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="profit">Profit*</label>
            <input
              type="number"
              name="profit"
              id="profit"
              value={formik.values.profit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.profit && formik.errors.profit ? (
              <div className="error-message">{formik.errors.profit}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="ml-auto flex justify-center rounded-lg bg-green-600 hover:bg-green-800 px-3 py-2 font-semibold duration-150"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="h-5 w-5 animate-spin text-whiteAlt-50"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-700 border text-gray-200 rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back
        </button>
      </Layout>
    );
  }
}

export async function getServerSideProps({ params }) {
  const order = await getOrderById(params.slug);
  return {
    props: { order },
  };
}
