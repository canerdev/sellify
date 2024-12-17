import { useState, useEffect } from "react";
import { getColumnInfo } from "@/pages/api/form";
import { toast } from "react-toastify";

const NewRecordForm = ({ isOpen, onClose, onSubmit, tableName }) => {
  const [columnInfo, setColumnInfo] = useState([]);
  const [columns, setColumns] = useState([]); // State to store filtered columns
  const [formData, setFormData] = useState({});

  // Fetch column information when the table name changes
  useEffect(() => {
    const fetchColumnInfo = async () => {
      const data = await getColumnInfo(tableName);

      // Filter out columns with 'auto_increment'
      const filteredColumns = data.filter(
        (col) => col.EXTRA !== "auto_increment"
      );
      setColumnInfo(filteredColumns); // Store filtered data for validation
      setColumns(filteredColumns.map((col) => col.COLUMN_NAME)); // Store only column names
    };

    fetchColumnInfo();
  }, [tableName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const validatedFormData = {};
    let hasError = false;

    // Validate required fields and data types
    columnInfo.forEach((column) => {
      const { COLUMN_NAME, DATA_TYPE, IS_NULLABLE } = column;
      const value = formData[COLUMN_NAME];

      // Check nullability
      if (IS_NULLABLE === "NO" && !value) {
        toast.error(`Field "${COLUMN_NAME}" is required.`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        hasError = true;
        return;
      }

      // Validate data type
      if (value) {
        if (
          (DATA_TYPE === "int" && isNaN(parseInt(value))) ||
          (DATA_TYPE === "decimal" && isNaN(parseFloat(value))) ||
          (DATA_TYPE === "date" && isNaN(Date.parse(value)))
        ) {
          toast.error(`Field "${COLUMN_NAME}" must be a valid ${DATA_TYPE}.`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          hasError = true;
        }
      }

      // Add to validated form data if no errors
      validatedFormData[COLUMN_NAME] = value;
    });

    if (!hasError) {
      onSubmit(tableName, validatedFormData);
      setFormData({});
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      setFormData({});
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center popup-overlay"
      onClick={handleClickOutside}
    >
      <div className="bg-[#060e1a] rounded-lg shadow-lg p-6 w-1/3 max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">
          Add New Record
        </h2>
        <form>
          {columnInfo.map((column, idx) => {
            const { COLUMN_NAME, DATA_TYPE, IS_NULLABLE } = column;
            return (
              <div key={idx} className="mb-4">
                <label
                  htmlFor={COLUMN_NAME}
                  className="block text-sm font-medium text-gray-200"
                >
                  {COLUMN_NAME}
                  {IS_NULLABLE === "NO" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type={
                    DATA_TYPE === "int" || DATA_TYPE === "decimal"
                      ? "number"
                      : DATA_TYPE === "date"
                      ? "date"
                      : "text"
                  }
                  id={COLUMN_NAME}
                  name={COLUMN_NAME}
                  value={formData[COLUMN_NAME] || ""}
                  onChange={handleChange}
                  placeholder={COLUMN_NAME}
                  className="mt-1 p-2 w-full border rounded-md bg-[#030811] text-gray-200 focus:outline-none focus:ring-2"
                  required={IS_NULLABLE === "NO"}
                />
              </div>
            );
          })}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRecordForm;
