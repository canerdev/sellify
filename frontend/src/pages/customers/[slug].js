import Layout from "../layout/Layout";
import { getCustomerById } from "../api/customers";

export default function Customer({ customer }) {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">
          Customer Details
        </h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Name</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.name || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">ID</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.id || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Email</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.email || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Phone</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.phone || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Country</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.country || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">City</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.city || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Last Order ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.lastOrderID || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Postal Code
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.postalCode || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Region</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.region || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Segment</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.segment || "-"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">State</th>
                <td className="py-2 px-4 text-gray-200">
                  {customer?.state || "-"}
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
  const customer = await getCustomerById(params.slug);

  return {
    props: {
      customer,
    },
  };
}
