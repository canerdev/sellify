"use client";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#111827]">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1">
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-2 flex-grow">{children}</div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
