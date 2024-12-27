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
  FaSignOutAlt,
} from "react-icons/fa";

import { FaGear } from "react-icons/fa6";

export default function SideBar() {
  return (
    <div>
      <div className="flex flex-col w-64 h-screen px-4 py-2 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-[#13243e] border-gray-700">
        <Link href="/">
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
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/"
            >
              <FaHome className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Home</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/customers"
            >
              <FaUsers className="w-5 h-5" />
              <span className="mx-2 text-sm font-medium">Customers</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/orders"
            >
              <FaShoppingCart className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Orders</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/categories"
            >
              <FaListUl className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Categories</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/products"
            >
              <FaBoxes className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Products</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/users"
            >
              <FaUsersCog className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Users</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/departments"
            >
              <FaLayerGroup className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Departments</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/shipment-modes"
            >
              <FaShippingFast className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Shipment Modes</span>
            </Link>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-300 hover:bg-gray-300 hover:text-gray-600"
              href="/shipping-details"
            >
              <FaPeopleCarry className="w-5 h-5" />

              <span className="mx-2 text-sm font-medium">Shipping Details</span>
            </Link>
          </nav>

          <div className="mt-6">
            <div className="flex items-center justify-between mt-6">
              <Link
                href="/sign-in"
                className="transition-colors duration-200 rotate-180 text-gray-400 rtl:rotate-0 hover:text-gray-200"
              >
                <FaSignOutAlt className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
