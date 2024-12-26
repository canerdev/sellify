"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfDepartments,
  getDepartmentsWithFilter,
  deleteDepartment,
} from "../api/departments";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
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
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentDepartmentId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteDepartment(currentDepartmentId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete department:", error);
    } finally {
      setCurrentDepartmentId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentDepartmentId(null);
  };

  const handleView = (id) => {
    router.push(`/departments/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/departments/department-edit/${id}`);
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
      setAdded(false);
    }

    fetchDepartments();
  }, [offset, limit, currentPage, deleted, added]);

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
            setAdded={setAdded}
            createPath="/departments/department-create"
            onEdit={handleEdit}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this department?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
