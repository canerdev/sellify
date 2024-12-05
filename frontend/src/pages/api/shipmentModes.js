export async function getAllShipmentModes() {
  const res = await fetch("http://localhost:8080/api/shipment-modes");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getShipmentModesWithFilter(offset, limit) {
  const res = await fetch(
    `http://localhost:8080/api/shipment-modes/filter?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
