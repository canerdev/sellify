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
