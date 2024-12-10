"use client";

import Layout from "../layout/Layout";
import { getAllCustomers, getCustomersWithFilter } from "../api/customers";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Customers() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      const customers = await getCustomersWithFilter(offset, limit);
      const allCustomers = await getAllCustomers();
      setCount(allCustomers.length);
      setCustomers(customers);
      setIsLoading(false);
    }

    fetchCustomers();
  }, [offset, limit, currentPage]);

  const headers = ["ID", "Name", "Email", "Phone"];
  const columns = ["id", "name", "email", "phone"];

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
            items={customers}
            columns={columns}
            count={count}
            description={"Customers Table"}
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