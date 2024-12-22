"use client";

import Layout from "../layout/Layout";
import {
  getCustomersWithFilter,
  getNumberOfCustomers,
  deleteCustomer,
} from "../api/customers";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Customers() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentCustomerId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteCustomer(currentCustomerId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete customer:", error);
    } finally {
      setCurrentCustomerId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentCustomerId(null);
  };

  const handleView = (id) => {
    router.push(`/customers/${id}`);
  };

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      const customers = await getCustomersWithFilter(offset, limit);
      const customersCount = await getNumberOfCustomers();
      setCount(customersCount.count);
      setCustomers(customers);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchCustomers();
  }, [offset, limit, currentPage, deleted, added]);

  const headers = ["ID", "Name", "City", "Email", "Phone"];
  const columns = ["id", "name", "city", "email", "phone"];

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
            onDelete={handleDelete}
            onView={handleView}
            tableName="customers"
            setAdded={setAdded}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this customer?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
