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

export async function getNumberOfCustomers() {
  const res = await fetch("http://localhost:8080/api/customers/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteCustomer(id) {
  console.log("Deleting customer with id: ", id);

  const res = await fetch(`http://localhost:8080/api/customers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete the customer");
  }
}
