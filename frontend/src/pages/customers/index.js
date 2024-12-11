"use client";

import Layout from "../layout/Layout";
import {
  getCustomersWithFilter,
  getNumberOfCustomers,
  // deleteCustomer,
} from "../api/customers";
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
  // const [deleted, setDeleted] = useState(false);

  // async function handleDelete(id) {
  //   await deleteCustomer(id);
  //   console.log("Customer deleted with id: ", id);
  //   setDeleted(true);
  // }

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      const customers = await getCustomersWithFilter(offset, limit);
      const customersCount = await getNumberOfCustomers();
      setCount(customersCount.count);
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
            // onDelete={handleDelete}
          />
        </div>
      </Layout>
    );
  }
}
