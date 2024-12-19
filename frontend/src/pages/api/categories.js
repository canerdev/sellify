import { toast } from "react-toastify";

export async function getAllCategories() {
  const res = await fetch("http://localhost:8080/api/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getCategoriesWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/categories/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getNumberOfCategories() {
  const res = await fetch("http://localhost:8080/api/categories/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteCategory(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Category deleted successfully", {
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
  } catch (err) {
    toast.error(`Failed to delete category: ${err.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getCategoryById(id) {
  const res = await fetch(`http://localhost:8080/api/categories/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
