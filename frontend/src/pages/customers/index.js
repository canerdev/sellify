"use client";

import Layout from "../layout/Layout";
import {
  deleteCustomer,
  getAllCustomers
} from "../api/customers";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Customers() {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
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

  const handleEdit = (id) => {
    router.push(`/customers/customer-edit/${id}`);
  };

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      const customers = await getAllCustomers();
      setCustomers(customers);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchCustomers();
  }, [deleted, added]);

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
            description={"Customers Table"}
            onDelete={handleDelete}
            onView={handleView}
            tableName="customers"
            setAdded={setAdded}
            createPath="/customers/customer-create"
            onEdit={handleEdit}
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
