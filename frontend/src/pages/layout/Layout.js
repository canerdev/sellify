import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <SideBar className="w-64 bg-gray-200" />
          
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4">{children}</main>
            <Footer className="bg-gray-800 text-white p-4" />
          </div>
        </div>
      </div>
    );
  }
  