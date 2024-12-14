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
  const res = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete the product");
  }
}
