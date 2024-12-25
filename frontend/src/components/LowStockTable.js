import React, { useState, useEffect, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import { getLowStockProducts } from "@/pages/api/products";

const LowStockTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [threshold, setThreshold] = useState(65);
  const [inputValue, setInputValue] = useState("65");
  const [debouncedThreshold, setDebouncedThreshold] = useState(65);

  const fetchLowStockProducts = async (thresholdValue) => {
    try {
      setIsLoading(true);
      const response = await getLowStockProducts(thresholdValue);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Use debounced threshold for API calls
  useEffect(() => {
    fetchLowStockProducts(debouncedThreshold);
  }, [debouncedThreshold]);

  // Debounce the threshold updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedThreshold(threshold);
    }, 1000); // Wait for 1 second

    return () => clearTimeout(timer);
  }, [threshold]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Only update threshold if value is a valid number
    if (value === "") {
      setThreshold(0);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setThreshold(numValue);
      }
    }
  };

  const renderContent = () => {
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
        <div className="flex items-center justify-center h-[300px] text-gray-200">
          No low stock items found
        </div>
      );
    }

    return (
      <div className="relative rounded-md">
        <div className="overflow-auto max-h-[300px]">
          <Table>
            <TableHeader className="sticky top-0 bg-[#151b23] z-10">
              <TableRow>
                <TableHead className="w-[70%] text-gray-200">Product Name</TableHead>
                <TableHead className="w-[20%] text-gray-200">Current Stock</TableHead>
                <TableHead className="w-[10%] text-gray-200">Last Sold</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="group transition-colors hover:bg-[#151b23] relative"
                >
                  <TableCell className="font-medium max-w-[200px] first:rounded-l-lg group-hover:first:rounded-l-lg text-gray-200">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-gray-200">{item.stockCount}</TableCell>
                  <TableCell className="last:rounded-r-lg group-hover:last:rounded-r-lg text-gray-200">
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
    );
  };

  return (
    <Card className="bg-[#080b14] w-full h-full rounded-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-gray-200">Low Stock Items</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-200">Threshold:</span>
            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              className="w-24 bg-[#1F2937] text-gray-200 border-gray-500"
              min="0"
              disabled={isLoading}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-200">
              Loading...
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockTable;
