import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import * as Yup from "yup";
import Layout from "@/pages/layout/Layout";
import { createUser } from "@/pages/api/users";
import { getAllDepartments } from "@/pages/api/departments";
import { useRouter } from "next/router";

export default function CreateUserForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getAllDepartments();
      setDepartments(departments);
    };
    fetchDepartments();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      country: "",
      salary: "",
      age: "",
      departmentID: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Max 50 characters")
        .required("Name is required"),
      gender: Yup.string().required("Gender is required"),
      country: Yup.string()
        .max(50, "Max 50 characters")
        .required("Country is required"),
      salary: Yup.number().required("Salary is required"),
      age: Yup.number().required("Age is required"),
      departmentID: Yup.number().required("Department ID is required"),
    }),

    onSubmit: debounce(async (values, { resetForm }) => {
      setLoading(true);
      await createUser(values);
      setLoading(false);
      router.push("/users");
    }, 300),
  });

  return (
    <Layout>
      <form
        className="text-gray-200 flex flex-wrap gap-6 "
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
            <div>
              <div className="error-message">{formik.errors.name} </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="gender">Gender*</label>
          <select
            name="gender"
            id="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          >
            <option value="">Select a Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {formik.touched.price && formik.errors.gender ? (
            <div className="error-message">{formik.errors.gender} </div>
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
            <div>
              <div className="error-message">{formik.errors.country} </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="salary">Salary*</label>
          <input
            type="number"
            name="salary"
            id="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.salary && formik.errors.salary ? (
            <div>
              <div className="error-message">{formik.errors.salary} </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="age">Age*</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          />
          {formik.touched.age && formik.errors.age ? (
            <div>
              <div className="error-message">{formik.errors.age} </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full md:w-[calc(50%-12px)]">
          <label htmlFor="departmentID">Department*</label>
          <select
            type="number"
            name="departmentID"
            id="departmentID"
            value={formik.values.departmentID}
            onChange={(e) => {
              formik.setFieldValue("departmentID", Number(e.target.value));
            }}
            onBlur={formik.handleBlur}
            className="p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary-600"
          >
            <option value="">Select a Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          {formik.touched.departmentID && formik.errors.departmentID ? (
            <div className="error-message">{formik.errors.departmentID}</div>
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
