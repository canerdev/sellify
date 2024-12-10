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

      // convert total_profit to float
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
        // convert total_profit to float
        item.total_profit = parseFloat(
          parseFloat(item.total_profit).toFixed(2)
        );

        // convert orderDate to dd-mm-yy format
        const date = new Date(item.orderDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2); // get last two digits of year
        item.orderDate = `${day}-${month}-${year}`;
      });

      setProfitsByDay(data);
    }

    fetchProfitsByCategory();
    fetchProfitsByDay();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4">
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
      </div>
    </Layout>
  );
}
