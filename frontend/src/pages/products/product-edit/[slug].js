import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import Layout from "@/pages/layout/Layout";
import { updateProduct, getProductById } from "@/pages/api/products";
import { getAllCategories } from "@/pages/api/categories";
import { useRouter } from "next/navigation";
import Loading from "@/pages/loading";

export default function EditProductForm({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState(product);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: initialValues || {
      id: "",
      name: "",
      price: "",
      categoryID: "",
      stockCount: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      id: Yup.string()
        .matches(
          /^[A-Z]{3}-[A-Z]{2}-[0-9]{8}$/,
          "Product ID must be in the format XXX-XX-00000000"
        )
        .required("Product ID is required"),
      name: Yup.string()
        .max(255, "Max 255 characters")
        .required("Name is required"),
      price: Yup.number().required("Price is required"),
      categoryID: Yup.number().required("City is required"),
      stockCount: Yup.number().required("Stock count is required"),
    }),

    onSubmit: debounce(async (values, { resetForm }) => {
      setLoading(true);
      await updateProduct(values);
      setLoading(false);
      router.push("/products");
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
              disabled
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.id && formik.errors.id ? (
              <div className="error-message">{formik.errors.id} </div>
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
              <div>
                <div className="error-message">{formik.errors.name} </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="price">Price*</label>
            <input
              type="text"
              name="price"
              id="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error-message">{formik.errors.price} </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="categoryID">Category*</label>
            <select
              name="categoryID"
              id="categoryID"
              value={formik.values.categoryID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryID && formik.errors.categoryID ? (
              <div className="error-message">{formik.errors.categoryID}</div>
            ) : null}
          </div>

          <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
            <label htmlFor="stockCount">Stock Count*</label>
            <input
              type="number"
              name="stockCount"
              id="stockCount"
              value={formik.values.stockCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
            {formik.touched.stockCount && formik.errors.stockCount ? (
              <div className="error-message">{formik.errors.stockCount} </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full md:w-[calc(50%-12px)]"></div>

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
  const product = await getProductById(params.slug);
  return { props: { product } };
}