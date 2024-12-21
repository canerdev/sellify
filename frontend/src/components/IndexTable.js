import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NewRecordForm from "./NewRecordForm";
import { toast } from "react-toastify";

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
  onDelete,
  onView,
  tableName,
  setAdded,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleAddRecord = async (tableName, newRecord) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord), // Convert record data to JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Failed to add record to ${tableName}: ${
            errorData.error || "Unknown error"
          }`,
          {
            position: "bottom-right",
            autoClose: 4000,
          }
        );
        return;
      }

      setAdded(true);
      toast.success(`The record has been successfully added to ${tableName}!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        dangerouslySetInnerHTML: true,
      });
    } catch (error) {
      console.error(`Error adding record to ${tableName}:`, error);
      toast.error("An error occurred while adding the record.", {
        position: "bottom-right",
        autoClose: 4000,
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
          <button
            onClick={() => setIsPopupOpen(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-700 border rounded-lg hover:bg-gray-500 active:bg-gray-700 md:text-sm"
          >
            Add new
          </button>
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
                    {item[column] || "-"}
                  </td>
                ))}
                <td className="text-center px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => console.log("Edit", item.id)}
                      className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
                      aria-label="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (description == "Shipping Details Table") {
                          onView(item.orderID);
                        } else {
                          onView(item.id);
                        }
                      }}
                      className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
                      aria-label="View"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (description == "Shipping Details Table") {
                          onDelete(item.orderID);
                        } else {
                          onDelete(item.id);
                        }
                      }}
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

      <NewRecordForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddRecord}
        tableName={tableName}
      />
    </div>
  );
}
