import SideNavbar from "@/components/sideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className='flex h-svh overflow-hidden' id='detail'>
      <SideNavbar />
      <Outlet />
    </div>
  );
}
