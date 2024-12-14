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
  const res = await fetch(`http://localhost:8080/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete the user");
  }
}

export async function getUserById(id) {
  const res = await fetch(`http://localhost:8080/api/employees/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
