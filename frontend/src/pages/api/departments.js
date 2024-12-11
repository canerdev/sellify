export async function getAllDepartments() {
  const res = await fetch("http://localhost:8080/api/departments");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getDepartmentsWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/departments/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getNumberOfDepartments() {
  const res = await fetch("http://localhost:8080/api/departments/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
