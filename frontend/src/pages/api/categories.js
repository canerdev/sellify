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