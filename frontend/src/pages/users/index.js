"use client";

import Layout from "../layout/Layout";
import { getNumberOfUsers, getUsersWithFilter, deleteUser } from "../api/users";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Users() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const router = useRouter();

  async function handleDelete(id) {
    await deleteUser(id);
    setDeleted(true);
  }

  const handleView = (id) => {
    router.push(`/users/${id}`);
  };

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const users = await getUsersWithFilter(offset, limit);
      const usersCount = await getNumberOfUsers();
      setCount(usersCount.count);
      setUsers(users);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchUsers();
  }, [offset, limit, currentPage, deleted, added]);

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
            count={count}
            description={"Users Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            tableName="employees"
            setAdded={setAdded}
          />
        </div>
      </Layout>
    );
  }
}
