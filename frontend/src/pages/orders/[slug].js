import Layout from "../layout/Layout";
import { getOrderById } from "../api/orders";

export default function Order({ orderData }) {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">Order Details</h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Order ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.id || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Customer ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.customerID || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Employee ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.employeeID || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Order Date
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.orderDate || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Payment Method
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.paymentMethod || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Status</th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.status || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Tracking Number
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.trackingNumber || "-"}
                </td>
              </tr>

              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Products
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {orderData?.details.map((detail, index) => {
                    return (
                      <tbody>
                        <p className="border rounded-md font-semibold text-center m-2">
                          Product {index + 1}
                        </p>
                        <tr key={index} className="border-gray-700">
                          <th className="py-2 px-4 text-gray-200">
                            Product ID
                          </th>
                          <td className="py-2 px-4 text-gray-200">
                            {detail?.productID}{" "}
                          </td>
                        </tr>
                        <tr className="border-gray-700">
                          <th className="py-2 px-4 text-gray-200">Amount</th>
                          <td className="py-2 px-4 text-gray-200">
                            {Number(detail?.amount || 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr className="border-gray-700">
                          <th className="py-2 px-4 text-gray-200">Discount</th>
                          <td className="py-2 px-4 text-gray-200">
                            {Number(detail?.discount || 0).toFixed(2)}{" "}
                          </td>
                        </tr>
                        <tr className="border-gray-700">
                          <th className="py-2 px-4 text-gray-200">Profit</th>
                          <td className="py-2 px-4 text-gray-200">
                            {Number(detail?.profit).toFixed(2)}{" "}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <th className="py-2 px-4 text-gray-200">Quantity</th>
                          <td className="py-2 px-4 text-gray-200">
                            {detail?.quantity}{" "}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
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
  const orderData = await getOrderById(params.slug);
  return {
    props: {
      orderData,
    },
  };
}
