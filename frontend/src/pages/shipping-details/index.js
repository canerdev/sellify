"use client";

import Layout from "../layout/Layout";
import {
  getNumberOfShippingDetails,
  getShippingDetailsWithFilter,
  deleteShippingDetail,
} from "../api/shippingDetails";
import IndexTable from "@/components/IndexTable";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function ShippingDetails() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [shippingDetails, setShippingDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(false);

  async function handleDelete(id) {
    await deleteShippingDetail(id);
    setDeleted(true);
  }

  useEffect(() => {
    async function fetchShippingDetails() {
      setIsLoading(true);
      const shippingDetails = await getShippingDetailsWithFilter(offset, limit);
      const countShippingDetails = await getNumberOfShippingDetails();
      setCount(countShippingDetails.count);
      setShippingDetails(shippingDetails);
      setIsLoading(false);
      setDeleted(false);
    }

    fetchShippingDetails();
  }, [offset, limit, currentPage, deleted]);

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
          />
        </div>
      </Layout>
    );
  }
}
