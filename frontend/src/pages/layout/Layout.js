import SideBar from "@/components/SideBar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
