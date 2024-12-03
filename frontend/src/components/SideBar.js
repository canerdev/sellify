import Link from "next/link";
import Image from "next/image";
import { 
    FaUsers, 
    FaHome, 
    FaShoppingCart, 
    FaListUl, 
    FaBoxes, 
    FaUsersCog, 
    FaLayerGroup, 
    FaShippingFast, 
    FaPeopleCarry, 
    FaSignOutAlt 
} from "react-icons/fa";

import { FaGear } from "react-icons/fa6";


export default function SideBar() {
  return (
    <>
      <div className="flex flex-col w-64 h-screen px-5 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <Link href="#">
          <Image
            className="w-auto h-24 rounded-md"
            width={300}
            height={70}
            src="/sellify-logo.png"
            alt=""
          />
        </Link>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-3 ">
            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaHome className="w-5 h-5" />

              <span class="mx-2 text-sm font-medium">Home</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaUsers className="w-5 h-5" />
              <span class="mx-2 text-sm font-medium">Customers</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaShoppingCart className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Orders</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaListUl className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Categories</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaBoxes className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Products</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaUsersCog className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Employees</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaLayerGroup className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Departments</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaShippingFast className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Shipment Modes</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaPeopleCarry className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Shipping Details</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <FaGear className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Setting</span>
            </Link>
          </nav>

          <div className="mt-6">
            <div className="flex items-center justify-between mt-6">
              <Link
                href="#"
                className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <FaSignOutAlt className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
