export async function getAllOrders() {
  const res = await fetch("http://localhost:8080/api/orders");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getOrdersWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/orders/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
