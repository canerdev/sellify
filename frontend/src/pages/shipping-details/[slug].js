import Layout from "../layout/Layout";
import { getShippingDetailById } from "../api/shippingDetails";

export default function ShippingDetail({ shippingDetail }) {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">
          Shipping Details
        </h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Order ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.orderID || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Shipment Mode ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.shipmentModeID || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Shipping Date
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.shippingDate || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Country</th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.country || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">City</th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.city || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Postal Code
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.postalCode || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Region</th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.region || "-"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">State</th>
                <td className="py-2 px-4 text-gray-200">
                  {shippingDetail?.state || "-"}
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
  const shippingDetail = await getShippingDetailById(params.slug);
  return {
    props: {
      shippingDetail,
    },
  };
}
