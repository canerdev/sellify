import React from 'react';
import Layout from '../layout/Layout';
import LowStockTable from '@/components/LowStockTable';

export default function LowStockPage() {
    return (
        <Layout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Low Stock Inventory</h1>
                    <p className="text-gray-600">Monitor items that need restocking</p>
                </div>
                <LowStockTable />
            </div>
        </Layout>
    );
}