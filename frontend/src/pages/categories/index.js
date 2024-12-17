"use client";

import Layout from "../layout/Layout";
import {
  getCategoriesWithFilter,
  getNumberOfCategories,
  deleteCategory,
} from "../api/categories";
import IndexTable from "@/components/IndexTable";
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

  const router = useRouter();

  async function handleDelete(id) {
    await deleteCategory(id);
    setDeleted(true);
  }

  const handleView = (id) => {
    router.push(`/categories/${id}`);
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
    }

    fetchCategories();
  }, [offset, limit, currentPage, deleted]);

  const headers = ["ID", "Name", "Description", "Status"];
  const columns = ["id", "name", "description", "status"];

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
          />
        </div>
      </Layout>
    );
  }
}
