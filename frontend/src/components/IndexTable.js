import Link from "next/link";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function IndexTable({
  headers,
  items,
  columns,
  description,
  count,
  limit,
  setOffset,
  currentPage,
  setCurrentPage,
  // onDelete,
}) {
  const totalPages = Math.ceil(count / limit);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setOffset((prevOffset) => {
        return prevOffset + limit;
      });
      setCurrentPage((prevPage) => {
        return prevPage + 1;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setOffset((prevOffset) => {
        return prevOffset - limit;
      });
      setCurrentPage((prevPage) => {
        return prevPage - 1;
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h2 className="text-gray-200 text-2xl font-bold mt-2">
            {description || "Index Table"}
          </h2>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href="#"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-700 border rounded-lg hover:bg-gray-500 active:bg-gray-700 md:text-sm"
          >
            Add new
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-center">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="py-3 text-center px-2">
                  {header}
                </th>
              ))}
              <th className="py-3 px-2"></th>
            </tr>
          </thead>
          <tbody className="text-gray-200 divide-y">
            {items.map((item, idx) => (
              <tr key={idx}>
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className="px-2 text-center py-4 whitespace-nowrap"
                  >
                    {item[column]}
                  </td>
                ))}
                <td className="text-center px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => console.log("Edit", item.id)} // TODO: Implement edit functionality
                      className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
                      aria-label="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => console.log("View", item.id)} // TODO: Implement view functionality
                      className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
                      aria-label="View"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        // onDelete(item.id);
                        console.log("Deleted: ", item.id);
                      }} // TODO: Implement delete functionality
                      className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
                      aria-label="Delete"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium rounded-lg border ${
            currentPage === 1
              ? "text-gray-400 bg-gray-200 cursor-not-allowed"
              : "text-gray-300 bg-gray-800 hover:bg-gray-600"
          }`}
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-400">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium rounded-lg border ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-200 cursor-not-allowed"
              : "text-gray-300 bg-gray-800 hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
