import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#13243e] p-4 text-center text-white">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2">
          <Link href="#">
            <Image
              className="w-auto h-12 rounded-md"
              width={150}
              height={30}
              src="/sellify-logo.png"
              alt="Sellify Logo"
            />
          </Link>
          <p className="text-gray-400 text-sm">
            © {year} Sellify. All rights reserved.
          </p>
        </div>

        <p className="text-gray-300">
          Made by <span className="text-yellow-500">🐝</span>
        </p>
      </div>
    </footer>
  );
}
