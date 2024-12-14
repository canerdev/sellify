export async function getAllShippingDetails() {
  const res = await fetch("http://localhost:8080/api/shipping-details");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getShippingDetailsWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/shipping-details/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getNumberOfShippingDetails() {
  const res = await fetch("http://localhost:8080/api/shipping-details/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteShippingDetail(id) {
  const res = await fetch(`http://localhost:8080/api/shipping-details/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete the shipping detail");
  }
}

export async function getShippingDetailById(id) {
  const res = await fetch(`http://localhost:8080/api/shipping-details/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
