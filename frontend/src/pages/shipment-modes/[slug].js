import Layout from "../layout/Layout";
import { getShipmentModeById } from "../api/shipmentModes";

export default function ShipmentMode({ shipmentMode }) {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">
          Shipment Mode Details
        </h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Name</th>
                <td className="py-2 px-4 text-gray-200">
                  {shipmentMode?.name || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">ID</th>
                <td className="py-2 px-4 text-gray-200">
                  {shipmentMode?.id || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Description
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {shipmentMode?.description || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Estimated Time
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {shipmentMode?.estimatedTime || "-"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">Cost</th>
                <td className="py-2 px-4 text-gray-200">
                  {shipmentMode?.cost || "-"}
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
  const shipmentMode = await getShipmentModeById(params.slug);
  return {
    props: {
      shipmentMode,
    },
  };
}
