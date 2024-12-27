import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import Layout from "@/pages/layout/Layout";
import { createShippingDetail } from "../api/shippingDetails";
import { getAllOrders } from "../api/orders";
import { getAllShipmentModes } from "../api/shipmentModes";
import { useRouter } from "next/router";

export default function CreateShippingDetailForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [shipmentModes, setShipmentModes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders();
      setOrders(orders);
      const shipmentModes = await getAllShipmentModes();
      setShipmentModes(shipmentModes);
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      orderID: "",
      shipmentModeID: "",
      shippingDate: "",
      country: "",
      city: "",
      state: "",
      postalCode: "",
      region: "",
    },
    validationSchema: Yup.object({
      orderID: Yup.string().required("Order ID is required"),
      shipmentModeID: Yup.number().required("Shipment Mode is required"),
      shippingDate: Yup.date().required("Shipping Date is required"),
      country: Yup.string()
        .max(50, "Max 50 characters")
        .required("Country is required"),
      city: Yup.string()
        .max(50, "Max 50 characters")
        .required("City is required"),
      state: Yup.string()
        .max(50, "Max 50 characters")
        .required("State is required"),
      postalCode: Yup.string()
        .max(50, "Max 50 characters")
        .required("Postal Code is required"),
      region: Yup.string()
        .max(50, "Max 50 characters")
        .required("Region is required"),
    }),

    onSubmit: debounce(async (values, { resetForm }) => {
      setLoading(true);
      await createShippingDetail(values);
      setLoading(false);
      router.push("/shipping-details");
    }, 300),
  });

  return (
    <Layout>
      <form
        className="text-gray-200 flex flex-wrap gap-6 px-8 py-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="orderID">Order ID*</label>
          <select
            name="orderID"
            id="orderID"
            value={formik.values.orderID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          >
            <option value="">Select an Order ID</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id}
              </option>
            ))}
          </select>
          {formik.touched.orderID && formik.errors.orderID ? (
            <div className="error-message">{formik.errors.orderID}</div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="shipmentModeID">Shipment Mode</label>
          <select
            name="shipmentModeID"
            id="shipmentModeID"
            value={formik.values.shipmentModeID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          >
            <option value="">Select a Shipment Mode</option>
            {shipmentModes.map((shipmentMode) => (
              <option key={shipmentMode.id} value={shipmentMode.id}>
                {shipmentMode.name}
              </option>
            ))}
          </select>
          {formik.touched.shipmentModeID && formik.errors.shipmentModeID ? (
            <div className="error-message">{formik.errors.shipmentModeID}</div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="shippingDate">Shipping Date*</label>
          <input
            type="date"
            name="shippingDate"
            id="shippingDate"
            value={formik.values.shippingDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.shippingDate && formik.errors.shippingDate ? (
            <div className="error-message">{formik.errors.shippingDate} </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="country">Country*</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="error-message">{formik.errors.country} </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="city">City*</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="error-message">{formik.errors.city} </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="state">State*</label>
          <input
            type="text"
            name="state"
            id="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="error-message">{formik.errors.state} </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="postalCode">Postal Code*</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="error-message">{formik.errors.postalCode} </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="region">Region*</label>
          <input
            type="text"
            name="region"
            id="region"
            value={formik.values.region}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.region && formik.errors.region ? (
            <div className="error-message">{formik.errors.region} </div>
          ) : null}
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-700 border text-gray-200 rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex justify-center rounded-lg bg-green-600 hover:bg-green-800 px-3 py-2 font-semibold duration-150"
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
        </div>
      </form>
    </Layout>
  );
}
