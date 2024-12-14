import Layout from "../layout/Layout";
import { getUserById } from "../api/users";

export default function User({ user }) {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl font-bold text-gray-200 mt-2">User Details</h1>
        <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Name</th>
                <td className="py-2 px-4 text-gray-200">{user?.name || "-"}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">User ID</th>
                <td className="py-2 px-4 text-gray-200">{user?.id || "-"}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Gender</th>
                <td className="py-2 px-4 text-gray-200">
                  {user?.gender || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Age</th>
                <td className="py-2 px-4 text-gray-200">{user?.age || "-"}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">Country</th>
                <td className="py-2 px-4 text-gray-200">
                  {user?.country || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-gray-400 font-medium">
                  Department ID
                </th>
                <td className="py-2 px-4 text-gray-200">
                  {user?.departmentID || "-"}
                </td>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400 font-medium">Salary</th>
                <td className="py-2 px-4 text-gray-200">
                  {Number(user?.salary).toFixed(2) || "-"}
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
  const user = await getUserById(params.slug);
  return {
    props: {
      user,
    },
  };
}
