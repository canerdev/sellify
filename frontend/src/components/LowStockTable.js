import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLowStockProducts } from "@/pages/api/products";

const LowStockTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getLowStockProducts(65);
        console.log("Fetched data:", response);
        setData(response);
      } catch (err) {
        console.error("Error in component:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);

  if (isLoading) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load low stock items: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="w-full h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            No low stock items found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle>Low Stock Items</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="relative rounded-md">
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead className="w-[70%]">Product Name</TableHead>
                  <TableHead className="w-[20%]">Current Stock</TableHead>
                  <TableHead className="w-[10%]">Last Sold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="group transition-colors hover:bg-gray-300 relative"
                  >
                    <TableCell className="font-medium max-w-[200px] first:rounded-l-lg group-hover:first:rounded-l-lg">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.stockCount}</TableCell>
                    <TableCell className="last:rounded-r-lg group-hover:last:rounded-r-lg">
                      {item.lastSold
                        ? new Date(item.lastSold).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockTable;
