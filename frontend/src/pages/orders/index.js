"use client";

import Layout from "../layout/Layout";
import { getNumberOfOrders, getOrdersWithFilter } from "../api/orders";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Orders() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      const orders = await getOrdersWithFilter(offset, limit);
      const ordersCount = await getNumberOfOrders();
      setCount(ordersCount.count);
      setOrders(orders);
      setIsLoading(false);
    }

    fetchOrders();
  }, [offset, limit, currentPage]);

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
          />
        </div>
      </Layout>
    );
  }
}
