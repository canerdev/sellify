import { toast } from "react-toastify";

export async function getAllDepartments() {
  const res = await fetch("http://localhost:8080/api/departments");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getDepartmentsWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/departments/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getNumberOfDepartments() {
  const res = await fetch("http://localhost:8080/api/departments/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteDepartment(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/departments/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Department deleted successfully", {
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
    }
  } catch (error) {
    toast.error(`Failed to delete department: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getDepartmentById(id) {
  const res = await fetch(`http://localhost:8080/api/departments/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
