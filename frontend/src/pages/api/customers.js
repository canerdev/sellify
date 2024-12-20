import { toast } from "react-toastify";

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
  try {
    const res = await fetch(`http://localhost:8080/api/customers/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Customer deleted successfully", {
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
    toast.error(`Failed to delete customer: ${error.message}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export async function getCustomerDistributionByRegion() {
  const res = await fetch(
    "http://localhost:8080/api/customer-distribution-by-region"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}

export async function getCustomerById(id) {
  const res = await fetch(`http://localhost:8080/api/customers/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data from the server");
  }
  return await res.json();
}
