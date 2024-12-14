import Layout from "../layout/Layout";
import { getDepartmentById } from "../api/departments";

export default function Department({ department }) {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">
          Department Details
        </h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Department Name
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {department?.name || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Department ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {department?.id || "-"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Employee Count
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {department?.employeeCount || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-700 border text-gray-200 rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const department = await getDepartmentById(params.slug);
  return {
    props: {
      department,
    },
  };
}
