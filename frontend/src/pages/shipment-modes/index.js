"use client";

import Layout from "../layout/Layout";
import {
  getAllShipmentModes,
  getShipmentModesWithFilter,
} from "../api/shipmentModes";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function ShipmentModes() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchShipmentModes() {
      setIsLoading(true);
      const shipmentModes = await getShipmentModesWithFilter(offset, limit);
      const allShipmentModes = await getAllShipmentModes();
      setCount(allShipmentModes.length);
      setShipmentModes(shipmentModes);
      setIsLoading(false);
    }

    fetchShipmentModes();
  }, [offset, limit, currentPage]);

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
          />
        </div>
      </Layout>
    );
  }
}
