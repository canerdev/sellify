import localFont from "next/font/local";
import { useState, useEffect } from "react";
import Layout from "./layout/Layout";

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
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-geist-sans">Home</h1>
      </div>
    </Layout>
  );
}
