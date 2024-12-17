export async function getColumnInfo(tableName) {
  const res = await fetch("http://localhost:8080/api/columns/" + tableName);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
