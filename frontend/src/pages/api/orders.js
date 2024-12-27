import { toast } from "react-toastify";

export async function createOrder(data) {
  try {
    const res = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Order added successfully", {
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
    toast.error(`Failed to add order: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function createOrderDetail(data) {
  try {
    const res = await fetch("http://localhost:8080/api/order-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Order details added successfully", {
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
    toast.error(`Failed to add order details: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function updateOrder(data) {
  try {
    const res = await fetch(`http://localhost:8080/api/orders/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Order updated successfully", {
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
    toast.error(`Failed to update order: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

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

export async function getNumberOfOrders() {
  const res = await fetch("http://localhost:8080/api/orders/count");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function deleteOrder(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/orders/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Order deleted successfully", {
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
    toast.error(`Failed to delete order: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getTotalProfitByCategory() {
  const res = await fetch("http://localhost:8080/api/total-profit-by-category");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getTotalProfitByDay() {
  const res = await fetch("http://localhost:8080/api/total-profit-by-day");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getBestSellerProducts() {
  const res = await fetch("http://localhost:8080/api/best-selling-products");
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }

  const data = await res.json();
  return data.slice(0, 5);
}

export async function getOrderById(id) {
  try {
    const [orderResponse, detailsResponse] = await Promise.all([
      fetch(`http://localhost:8080/api/orders/${id}`),
      fetch(`http://localhost:8080/api/order-details/${id}`),
    ]);

    if (!orderResponse.ok || !detailsResponse.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    const order = await orderResponse.json();
    const details = await detailsResponse.json();

    return { ...order, details };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching order and order details");
  }
}
