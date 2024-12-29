"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfOrders,
  getOrdersWithFilter,
  deleteOrder,
  getAllOrders
} from "../api/orders";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentOrderId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteOrder(currentOrderId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete order:", error);
    } finally {
      setCurrentOrderId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentOrderId(null);
  };

  const handleView = (id) => {
    router.push(`/orders/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/orders/order-edit/${id}`);
  };

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      const orders = await getAllOrders();

      orders.forEach((item) => {
        const date = new Date(item.orderDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        item.orderDate = `${year}-${month}-${day}`;
      });
    
      setOrders(orders);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchOrders();
  }, [deleted, added]);

  const headers = ["ID", "Customer", "Handler ID", "Date", "Status"];
  const columns = ["id", "customerID", "employeeID", "orderDate", "status"];

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div>
          <IndexTable
            headers={headers}
            items={orders}
            columns={columns}
            description={"Orders Table"}
            onDelete={handleDelete}
            onView={handleView}
            tableName="orders"
            setAdded={setAdded}
            createPath="/orders/order-create"
            onEdit={handleEdit}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this order?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
