import { useState } from "react";

const NewRecordForm = ({ isOpen, onClose, onSubmit, columns }) => {
  const [formData, setFormData] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData(
      columns.reduce((acc, column) => ({ ...acc, [column]: "" }), {})
    );
    onClose();
  };

  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
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
          {columns.map((column, idx) => (
            <div key={idx} className="mb-4">
              {/* <label
                  htmlFor={column}
                  className="block text-sm font-medium text-gray-200"
                >
                  {column}
                </label> */}
              <input
                type="text"
                id={column}
                name={column}
                value={formData[column]}
                onChange={handleChange}
                placeholder={column}
                className="mt-1 p-2 w-full border rounded-md bg-[#030811] text-gray-200 focus:outline-none focus:ring-2"
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
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