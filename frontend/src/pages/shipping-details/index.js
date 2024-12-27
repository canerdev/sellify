"use client";

import Layout from "../layout/Layout";
import {
  deleteShippingDetail,
  getAllShippingDetails
} from "../api/shippingDetails";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function ShippingDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState([]);
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

  const handleEdit = (id) => {
    router.push(`/shipping-details/shipping-detail-edit/${id}`);
  };

  useEffect(() => {
    async function fetchShippingDetails() {
      setIsLoading(true);
      const shippingDetails = await getAllShippingDetails();
      setShippingDetails(shippingDetails);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchShippingDetails();
  }, [deleted, added]);

  console.log(shippingDetails);

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
            description={"Shipping Details Table"}
            onDelete={handleDelete}
            onView={handleView}
            tableName="shippingDetails"
            setAdded={setAdded}
            createPath="/shipping-details/shipping-detail-create"
            onEdit={handleEdit}
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
