"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfOrders,
  getOrdersWithFilter,
  deleteOrder,
} from "../api/orders";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Orders() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
      const orders = await getOrdersWithFilter(offset, limit);
      const ordersCount = await getNumberOfOrders();
      setCount(ordersCount.count);
      setOrders(orders);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchOrders();
  }, [offset, limit, currentPage, deleted, added]);

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
            count={count}
            description={"Orders Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
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
