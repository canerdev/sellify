"use client";

import Layout from "../layout/Layout";
import { deleteProduct, getAllProducts } from "../api/products";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentProductId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteProduct(currentProductId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setCurrentProductId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentProductId(null);
  };

  const handleView = (id) => {
    router.push(`/products/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/products/product-edit/${id}`);
  };

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const products = await getAllProducts();
      setProducts(products);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }
    fetchProducts();
  }, [deleted, added]);

  const headers = ["ID", "Name", "Price", "Cost", "Category", "Stock"];
  const columns = ["id", "name", "price", "cost", "categoryID", "stockCount"];

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
            description={"Products Table"}
            onDelete={handleDelete}
            onView={handleView}
            tableName="products"
            setAdded={setAdded}
            createPath="/products/product-create"
            onEdit={handleEdit}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this product?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
