"use client";

import Layout from "../layout/Layout";
import { getAllProducts, getProductsByFilter } from "../api/products";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Products() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const products = await getProductsByFilter(offset, limit);
      const allProducts = await getAllProducts();
      setCount(allProducts.length);
      setProducts(products);
      setIsLoading(false);
    }

    fetchProducts();
  }, [offset, limit, currentPage]);

  const headers = ["ID", "Name", "Price", "Category", "Stock"];
  const columns = ["id", "name", "price", "categoryID", "stockCount"];

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
            items={products}
            columns={columns}
            count={count}
            description={"Products Table"}
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