import { toast } from "react-toastify";

export async function getAllProducts() {
  const res = await fetch("http://localhost:8080/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getProductsByFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/products/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getNumberOfProducts() {
  const res = await fetch("http://localhost:8080/api/products/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Product deleted successfully", {
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
    toast.error(`Failed to delete product: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getProductById(id) {
  const res = await fetch(`http://localhost:8080/api/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getLowStockProducts(threshold) {
  try {
    const res = await fetch(`http://localhost:8080/api/low-stock/${threshold}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("API Response:", data); // Add this to debug
    return data;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
}
