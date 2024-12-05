export async function getAllCustomers() {
  const res = await fetch("http://localhost:8080/api/customers");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getCustomersWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/customers/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
