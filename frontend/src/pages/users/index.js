"use client";

import Layout from "../layout/Layout";
import { getAllUsers, getUsersWithFilter } from "../api/users";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Users() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const users = await getUsersWithFilter(offset, limit);
      const allUsers = await getAllUsers();
      setCount(allUsers.length);
      setUsers(users);
      setIsLoading(false);
    }

    fetchUsers();
  }, [offset, limit, currentPage]);

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
          />
        </div>
      </Layout>
    );
  }
}