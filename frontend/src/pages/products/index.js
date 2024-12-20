"use client";

import Layout from "../layout/Layout";
import { getNumberOfProducts, getProductsByFilter, deleteProduct } from "../api/products";
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
    router.push('/low-stock');
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
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="space-x-4">
              <Button
                variant="outline"
                onClick={handleLowStockClick}
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                View Low Stock
              </Button>
            </div>
          </div>
          <IndexTable
            headers={headers}
            columns={columns}
            data={products}
            handleDelete={handleDelete}
            handleView={handleView}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setOffset={setOffset}
            limit={limit}
            count={count}
          />
        </div>
      </Layout>
    );
  }
}
