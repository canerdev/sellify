import { toast } from "react-toastify";

export async function getAllUsers() {
  const res = await fetch("http://localhost:8080/api/employees");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getUsersWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/employees/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getNumberOfUsers() {
  const res = await fetch("http://localhost:8080/api/employees/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("User deleted successfully", {
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
    toast.error(`Failed to delete user: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getUserById(id) {
  const res = await fetch(`http://localhost:8080/api/employees/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
