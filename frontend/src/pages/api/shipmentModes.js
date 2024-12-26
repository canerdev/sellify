import { toast } from "react-toastify";

export async function createShipmentMode(data) {
  console.log(data);

  try {
    const res = await fetch("http://localhost:8080/api/shipment-modes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Shipment mode added successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        dangerouslySetInnerHTML: true,
      });
    }
  } catch (error) {
    toast.error(`Failed to add shipment mode: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function updateShipmentMode(data) {
  try {
    const res = await fetch(
      `http://localhost:8080/api/shipment-modes/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      toast.success("Shipment mode updated successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        dangerouslySetInnerHTML: true,
      });
    }
  } catch (error) {
    toast.error(`Failed to update shipment mode: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

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

export async function getNumberOfShipmentModes() {
  const res = await fetch("http://localhost:8080/api/shipment-modes/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteShipmentMode(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/shipment-modes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Shipment mode deleted successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        dangerouslySetInnerHTML: true,
      });
    }
  } catch (error) {
    toast.error(`Failed to delete shipment mode: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getShipmentModeById(id) {
  const res = await fetch(`http://localhost:8080/api/shipment-modes/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
