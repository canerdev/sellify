import { toast } from "react-toastify";

export async function createShippingDetail(data) {
  try {
    const res = await fetch("http://localhost:8080/api/shipping-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Shipping Detail added successfully", {
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
    toast.error(`Failed to add shipping detail: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function updateShippingDetail(data) {
  try {
    const res = await fetch(
      `http://localhost:8080/api/shipping-details/${data.orderID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      toast.success("Shipping Detail updated successfully", {
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
    toast.error(`Failed to update shipping detail: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

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
  try {
    const res = await fetch(
      `http://localhost:8080/api/shipping-details/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success("Shipping Detail deleted successfully", {
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
    toast.error(`Failed to delete shipping detail: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getShippingDetailById(id) {
  const res = await fetch(`http://localhost:8080/api/shipping-details/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
