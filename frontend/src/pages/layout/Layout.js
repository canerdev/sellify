"use client";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen w-screen fixed overflow-hidden bg-[#111827]">
      <SideBar />

      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-2 flex-grow">{children}</div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
