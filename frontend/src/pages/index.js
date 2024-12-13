import localFont from "next/font/local";
import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import {
  getTotalProfitByCategory,
  getTotalProfitByDay,
  getBestSellerProducts,
} from "./api/orders";
import{
  getCustomerDistributionByRegion
} from "./api/customers";

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
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [customerDistribution, setCustomerDistribution] = useState([]);

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

    async function fetchBestSellerProducts() {
      const data = await getBestSellerProducts();

      data.forEach((item) => {
        item.total_quantity = parseInt(item.total_quantity);
      });

      setBestSellerProducts(data);
    }
    
    async function fetchCustomerDistribution() {
      const data = await getCustomerDistributionByRegion();
      const processedData = data.reduce((acc, item) => {
        let region = acc.find(r => r.region === item.region);
        if (!region) {
          region = { region: item.region, totalCustomers: item.totalCustomersInRegion, states: [] };
          acc.push(region);
        }
        region.states.push({ name: item.state, customerCount: item.count });
        return acc;
      }, []);

      setCustomerDistribution(processedData);
    }

    
    fetchProfitsByCategory();
    fetchProfitsByDay();
    fetchBestSellerProducts();
    fetchCustomerDistribution();
  }, []);

  // tooltip of piechart for customer distribution by region 
  function createTooltipContent(dataItem) {
    let content = `<strong>${dataItem.region}:</strong><br>Total Customers: ${dataItem.totalCustomers}<br><br>States:<br>`;
    dataItem.states.forEach(state => {
      content += `<strong>${state.name}:</strong> ${state.customerCount}<br>`;
    });
    return content;
  }
  
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
          <BarChart
            data={bestSellerProducts}
            xField="name"
            yField="total_quantity"
            caption="Best Selling Products (Last 30 Days)"
            className="col-span-2"
            showXLabels={false}
          />
          <PieChart
            data={customerDistribution}
            caption="Customer Distribution by Region"
            valueField="totalCustomers"
            labelField="region"
            tooltipFunction= {createTooltipContent}
          />
        </div>
      </div>
    </Layout>
  );
}
