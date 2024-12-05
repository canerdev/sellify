"use client";

import Layout from "../layout/Layout";
import { getAllCategories, getCategoriesWithFilter } from "../api/categories";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Categories() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      const categories = await getCategoriesWithFilter(offset, limit);
      const allCategories = await getAllCategories();
      setCount(allCategories.length);
      setCategories(categories);
      setIsLoading(false);
    }

    fetchCategories();
  }, [offset, limit, currentPage]);

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
          />
        </div>
      </Layout>
    );
  }
}
