import localFont from "next/font/local";
import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { getTotalProfitByCategory, getTotalProfitByDay } from "./api/orders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [profitsByCategory, setProfitsByCategory] = useState([]);
  const [profitsByDay, setProfitsByDay] = useState([]);

  useEffect(() => {
    async function fetchProfitsByCategory() {
      const data = await getTotalProfitByCategory();

      // convert total_price to double
      data.forEach((item) => {
        item.total_profit = parseFloat(
          parseFloat(item.total_profit).toFixed(2)
        );
      });

      setProfitsByCategory(data);
    }

    async function fetchProfitsByDay() {
      const data = await getTotalProfitByDay();

      data.forEach((item) => {
        // Convert total_profit to a float with 2 decimal places
        item.total_profit = parseFloat(
          parseFloat(item.total_profit).toFixed(2)
        );

        // Convert orderDate to dd-mm-yy format
        const date = new Date(item.orderDate); // Parse the date string
        const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
        item.orderDate = `${day}-${month}-${year}`; // Format as dd-mm-yy
      });

      setProfitsByDay(data); // Set the formatted data
    }

    fetchProfitsByCategory();
    fetchProfitsByDay();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center flex-1 gap-4ges ">
        <div className="flex flex-row gap-4">
          <BarChart
            data={profitsByCategory}
            xField="name"
            yField="total_profit"
            caption="Total Profit by Category (Last 30 Days)"
          />
          <LineChart
            data={profitsByDay}
            xField="orderDate"
            yField="total_profit"
            caption="Total Profit by Day (Last 30 Days)"
          />
        </div>
        <div className="flex flex-row gap-4">
          <LineChart
            data={profitsByDay}
            xField="orderDate"
            yField="total_profit"
            caption="Total Profit by Day (Last 30 Days)"
          />
          <LineChart
            data={profitsByDay}
            xField="orderDate"
            yField="total_profit"
            caption="Total Profit by Day (Last 30 Days)"
          />
        </div>
      </div>
    </Layout>
  );
}
