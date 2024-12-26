import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import Layout from "../../layout/Layout";
import { updateCustomer, getCustomerById } from "../../api/customers";
import { useRouter } from "next/navigation";
import Loading from "../../loading";

export default function EditCustomerForm({ customer }) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(customer);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues || {
      id: "",
      segment: "",
      name: "",
      country: "",
      city: "",
      state: "",
      postalCode: "",
      region: "",
      email: "",
      phone: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      id: Yup.string()
        .matches(/^[A-Z]{2}-[0-9]{5}$/, "ID must be in the format AA-12345")
        .required("ID is required"),
      segment: Yup.string()
        .max(20, "Max 20 characters")
        .required("Segment is required"),
      name: Yup.string()
        .max(50, "Max 50 characters")
        .required("Name is required"),
      country: Yup.string()
        .max(50, "Max 50 characters")
        .required("Country is required"),
      city: Yup.string()
        .max(50, "Max 50 characters")
        .required("City is required"),
      state: Yup.string()
        .max(50, "Max 50 characters")
        .required("State is required"),
      postalCode: Yup.number().required("Postal code is required"),
      region: Yup.string()
        .max(50, "Max 50 characters")
        .required("Region is required"),
      email: Yup.string()
        .max(100, "Max 100 characters")
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(
          /^\(\d{3}\)\s\d{3}-\d{4}$/,
          "Phone number must be in the format (000) 111-2222"
        )
        .required("Phone is required"),
    }),

    onSubmit: debounce(async (values, { resetForm }) => {
      setLoading(true);
      await updateCustomer(values);
      setLoading(false);
      router.push("/customers");
    }, 300),
  });

  if (!initialValues) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <form
          className="text-gray-200 flex flex-wrap gap-6 "
          onSubmit={formik.handleSubmit}
        >
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
              <div className="error-message">{formik.errors.id} </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="segment">Segment*</label>
            <input
              type="text"
              name="segment"
              id="segment"
              value={formik.values.segment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.segment && formik.errors.segment ? (
              <div>
                <div className="error-message">{formik.errors.segment} </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name} </div>
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
              type="number"
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
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email} </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="phone">Phone*</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error-message">{formik.errors.phone} </div>
            ) : null}
          </div>

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
  const customer = await getCustomerById(params.slug);

  return {
    props: {
      customer,
    },
  };
}
