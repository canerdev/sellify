"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfDepartments,
  getDepartmentsWithFilter,
  deleteDepartment,
} from "../api/departments";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Departments() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);

  const router = useRouter();

  async function handleDelete(id) {
    await deleteDepartment(id);
    setDeleted(true);
  }

  const handleView = (id) => {
    router.push(`/departments/${id}`);
  };

  useEffect(() => {
    async function fetchDepartments() {
      setIsLoading(true);
      const departments = await getDepartmentsWithFilter(offset, limit);
      const departmentsCount = await getNumberOfDepartments();
      setCount(departmentsCount.count);
      setDepartments(departments);
      setIsLoading(false);
      setDeleted(false);
    }

    fetchDepartments();
  }, [offset, limit, currentPage, deleted]);

  const headers = ["ID", "Name", "Employee Count"];
  const columns = ["id", "name", "employeeCount"];

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
            items={departments}
            columns={columns}
            count={count}
            description={"Departments Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            tableName="departments"
          />
        </div>
      </Layout>
    );
  }
}
