import { useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import Layout from "@/pages/layout/Layout";
import { updateCategory, getCategoryById } from "@/pages/api/categories";
import { useRouter } from "next/navigation";
import Loading from "@/pages/loading";

export default function EditCategoryForm({ category }) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(category);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      description: "",
      status: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Max 50 characters")
        .required("Name is required"),
      description: Yup.string(),
      status: Yup.boolean().required("Status is required"),
    }),

    onSubmit: debounce(async (values, { resetForm }) => {
      setLoading(true);
      await updateCategory(values);
      setLoading(false);
      router.push("/categories");
    }, 300),
  });

  if (!initialValues) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <form
          className="text-gray-200 flex flex-wrap gap-6 px-8 py-4"
          onSubmit={formik.handleSubmit}
        >
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
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error-message">{formik.errors.description} </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="status">Status*</label>
            <select
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            >
              <option value={0}>passive</option>
              <option value={1}>active</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="error-message">{formik.errors.status}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]"></div>

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
}

export async function getServerSideProps({ params }) {
  const category = await getCategoryById(params.slug);
  return {
    props: {
      category,
    },
  };
}
