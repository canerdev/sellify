"use client";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 overflow-y-auto">
        <SideBar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-4 flex-grow">{children}</div>

          {/* Footer */}
          <Footer className="bg-gray-800 text-white" />
        </main>
      </div>
    </div>
  );
}
