"use client";

import Layout from "../layout/Layout";
import {
  getCategoriesWithFilter,
  getNumberOfCategories,
  deleteCategory,
} from "../api/categories";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Categories() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentCategoryId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteCategory(currentCategoryId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setCurrentCategoryId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentCategoryId(null);
  };

  const handleView = (id) => {
    router.push(`/categories/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/categories/category-edit/${id}`);
  };

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      const categories = await getCategoriesWithFilter(offset, limit);
      const categoriesCount = await getNumberOfCategories();
      setCount(categoriesCount.count);
      setCategories(categories);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchCategories();
  }, [offset, limit, currentPage, deleted, added]);

  const headers = ["ID", "Name", "Description"];
  const columns = ["id", "name", "description"];

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
            items={categories}
            columns={columns}
            count={count}
            description={"Categories Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            tableName="categories"
            setAdded={setAdded}
            createPath="/categories/category-create"
            onEdit={handleEdit}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this category?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
