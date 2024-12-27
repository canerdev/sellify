"use client";

import Layout from "../layout/Layout";
import { deleteUser, getAllUsers } from "../api/users";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentUserId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteUser(currentUserId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setCurrentUserId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentUserId(null);
  };

  const handleView = (id) => {
    router.push(`/users/${id}`);
  };

  const hanleEdit = (id) => {
    router.push(`/users/user-edit/${id}`);
  };

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const users = await getAllUsers();
      setUsers(users);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchUsers();
  }, [deleted, added]);

  const headers = ["ID", "Name", "Department"];
  const columns = ["id", "name", "departmentID"];

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
            items={users}
            columns={columns}
            description={"Users Table"}
            onDelete={handleDelete}
            onView={handleView}
            tableName="employees"
            setAdded={setAdded}
            createPath="/users/user-create"
            onEdit={hanleEdit}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this user?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
