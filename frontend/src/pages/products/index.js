"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfProducts,
  getProductsByFilter,
  deleteProduct,
} from "../api/products";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui

export default function Products() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  async function handleDelete(id) {
    await deleteProduct(id);
    setDeleted(true);
  }

  const handleView = (id) => {
    router.push(`/products/${id}`);
  };

  const handleLowStockClick = () => {
    router.push("/low-stock");
  };

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const products = await getProductsByFilter(offset, limit);
      const productsCount = await getNumberOfProducts();
      setCount(productsCount.count);
      setProducts(products);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }
    fetchProducts();
  }, [offset, limit, currentPage, deleted, added]);

  const headers = ["ID", "Name", "Price", "Category", "Stock"];
  const columns = ["id", "name", "price", "categoryID", "stockCount"];

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <div>
          <IndexTable
            headers={headers}
            items={products}
            columns={columns}
            count={count}
            description={"Products Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            tableName="products"
            setAdded={setAdded}
          />
        </div>
      </Layout>
    );
  }
}
