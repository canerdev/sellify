"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfShipmentModes,
  getShipmentModesWithFilter,
  deleteShipmentMode,
} from "../api/shipmentModes";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../loading";

export default function ShipmentModes() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [added, setAdded] = useState(false);

  const router = useRouter();

  async function handleDelete(id) {
    await deleteShipmentMode(id);
    setDeleted(true);
  }

  const handleView = (id) => {
    router.push(`/shipment-modes/${id}`);
  };

  useEffect(() => {
    async function fetchShipmentModes() {
      setIsLoading(true);
      const shipmentModes = await getShipmentModesWithFilter(offset, limit);
      const modesCount = await getNumberOfShipmentModes();
      setCount(modesCount.count);
      setShipmentModes(shipmentModes);
      setIsLoading(false);
      setDeleted(false);
      setAdded(false);
    }

    fetchShipmentModes();
  }, [offset, limit, currentPage, deleted, added]);

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
            count={count}
            description={"Shipment Modes Table"}
            limit={limit}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onDelete={handleDelete}
            onView={handleView}
            tableName="shipmentModes"
            setAdded={setAdded}
          />
        </div>
      </Layout>
    );
  }
}
