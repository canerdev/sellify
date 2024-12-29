import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

export default function IndexTable({
  headers,
  items,
  columns,
  description,
  onDelete,
  onView,
  createPath,
  onEdit,
}) {
  const dataGridColumns = columns.map((column, index) => ({
    field: column,
    headerName: headers[index],
    flex: 1,
  }));

  dataGridColumns.push({
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            if (description == "Shipping Details Table") {
              onEdit(params.row.orderID);
            } else {
              onEdit(params.row.id);
            }
          }}
          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
          aria-label="Edit"
        >
          <FaEdit className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            if (description == "Shipping Details Table") {
              onView(params.row.orderID);
            } else {
              onView(params.row.id);
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
              onDelete(params.row.orderID);
            } else {
              onDelete(params.row.id);
            }
          }}
          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150"
          aria-label="Delete"
        >
          <MdDelete className="w-5 h-5" />
        </button>
      </div>
    ),
  });

  const paginationModel = { page: 0, pageSize: 25 };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-4 text-gray-200">
      <div className="items-start justify-between md:flex pb-6">
        <div className="max-w-lg">
          <h2 className="text-gray-200 text-2xl font-bold mt-2">
            {description || "Index Table"}
          </h2>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href={createPath}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-700 border rounded-lg hover:bg-gray-500 active:bg-gray-700 md:text-sm"
          >
            Add new
          </Link>
        </div>
      </div>
      <Paper sx={{ height: 500, width: "100%", bgcolor: "#080b14" }}>
        <DataGrid
          rows={items}
          columns={dataGridColumns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          pagination
          getRowId={(row) => {
            if (description == "Shipping Details Table") {
              return row.orderID;
            } else {
              return row.id;
            }
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              color: "white",
              backgroundColor: "#080b14",
            },
            "& .MuiDataGrid-row": {
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#1f2937",
              },
              "&.Mui-selected": {
                backgroundColor: "#1a2235",
                "&:hover": {
                  backgroundColor: "#243145",
                },
              },
            },
            "& .MuiDataGrid-columnHeader": {
              color: "white",
              backgroundColor: "#0f1420",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "white !important",
            },
            "& .MuiCheckbox-root": {
              color: "white !important",
            },
            "& .MuiDataGrid-menuIconButton": {
              opacity: 1,
              color: "#4d5e63",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#080b14",
              color: "white",
              "& .MuiTablePagination-root": {
                color: "white",
              },
              "& .MuiTablePagination-selectLabel": {
                color: "white",
              },
              "& .MuiTablePagination-displayedRows": {
                color: "white",
              },
              "& .MuiTablePagination-select": {
                color: "white",
              },
              "& .MuiTablePagination-selectIcon": {
                color: "white",
              },
              "& .MuiIconButton-root": {
                color: "white",
              },
            },
          }}
        />
      </Paper>
    </div>
  );
}
