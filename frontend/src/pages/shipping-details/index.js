"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfShippingDetails,
  getShippingDetailsWithFilter,
  deleteShippingDetail,
} from "../api/shippingDetails";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function ShippingDetails() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [shippingDetails, setShippingDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentShippingDetailId, setCurrentShippingDetailId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentShippingDetailId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteShippingDetail(currentShippingDetailId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete shipping detail:", error);
    } finally {
      setCurrentShippingDetailId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentShippingDetailId(null);
  };

  const handleView = (id) => {
    router.push(`/shipping-details/${id}`);
  };

  useEffect(() => {
    async function fetchShippingDetails() {
      setIsLoading(true);
      const shippingDetails = await getShippingDetailsWithFilter(offset, limit);
      const countShippingDetails = await getNumberOfShippingDetails();
      setCount(countShippingDetails.count);
      setShippingDetails(shippingDetails);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchShippingDetails();
  }, [offset, limit, currentPage, deleted, added]);

  const headers = [
    "Order ID",
    "Shipment Mode",
    "Shipping Date",
    "City",
    "Country",
  ];
  const columns = [
    "orderID",
    "shipmentModeID",
    "shippingDate",
    "city",
    "country",
  ];

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
            items={shippingDetails}
            columns={columns}
            count={count}
            description={"Shipping Details Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            tableName="shippingDetails"
            setAdded={setAdded}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this shipping detail?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
