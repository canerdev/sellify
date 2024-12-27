import Layout from "../layout/Layout";
import { getProductById } from "../api/products";

export default function Product({ product }) {
  const date = new Date(product.lastSold);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  product.lastSold = `${year}-${month}-${day}`;

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">
          Product Details
        </h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Product Name
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {product?.name || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Product ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {product?.id || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Category ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {product?.categoryID || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Last Sold
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {product?.lastSold || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Price</th>
                <td className="py-2 px-4 text-gray-200">
                  {Number(product?.price).toFixed(2) || "-"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Stock Count
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {product?.stockCount || "-"}
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
  const product = await getProductById(params.slug);
  return {
    props: {
      product,
    },
  };
}
