"use client";

import Layout from "../layout/Layout";
import {
  getAllDepartments,
  getDepartmentsWithFilter,
} from "../api/departments";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Departments() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchDepartments() {
      setIsLoading(true);
      const departments = await getDepartmentsWithFilter(offset, limit);
      const allDepartments = await getAllDepartments();
      setCount(allDepartments.length);
      setDepartments(departments);
      setIsLoading(false);
    }

    fetchDepartments();
  }, [offset, limit, currentPage]);

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
          />
        </div>
      </Layout>
    );
  }
}
