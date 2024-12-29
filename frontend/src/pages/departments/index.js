"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfDepartments,
  getDepartmentsWithFilter,
  deleteDepartment,
  getAllDepartments
} from "../api/departments";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Departments() {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
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
      const departments = await getAllDepartments();
      setDepartments(departments);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchDepartments();
  }, [deleted, added]);

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
            description={"Departments Table"}
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
