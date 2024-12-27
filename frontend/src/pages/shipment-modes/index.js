"use client";

import Layout from "../layout/Layout";
import {
  deleteShipmentMode,
  getAllShipmentModes
} from "../api/shipmentModes";
import IndexTable from "@/components/IndexTable";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function ShipmentModes() {
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentShipmentModeId, setCurrentShipmentModeId] = useState(null);

  const router = useRouter();

  async function handleDelete(id) {
    setCurrentShipmentModeId(id);
    setIsDialogOpen(true);
  }

  const confirmDelete = async () => {
    setIsDialogOpen(false);
    try {
      await deleteShipmentMode(currentShipmentModeId);
      setDeleted(true);
    } catch (error) {
      console.error("Failed to delete shipment mode:", error);
    } finally {
      setCurrentShipmentModeId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setCurrentShipmentModeId(null);
  };

  const handleView = (id) => {
    router.push(`/shipment-modes/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/shipment-modes/shipment-mode-edit/${id}`);
  };

  useEffect(() => {
    async function fetchShipmentModes() {
      setIsLoading(true);
      const shipmentModes = await getAllShipmentModes();
      setShipmentModes(shipmentModes);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchShipmentModes();
  }, [deleted, added]);

  const headers = ["ID", "Name", "Description", "Estimated Time", "Cost"];
  const columns = ["id", "name", "description", "estimatedTime", "cost"];

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
            items={shipmentModes}
            columns={columns}
            description={"Shipment Modes Table"}
            onDelete={handleDelete}
            onView={handleView}
            tableName="shipmentModes"
            setAdded={setAdded}
            createPath="/shipment-modes/shipment-mode-create"
            onEdit={handleEdit}
          />
          {isDialogOpen && (
            <ConfirmDialog
              message="Are you sure you want to delete this shipment mode?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </Layout>
    );
  }
}
