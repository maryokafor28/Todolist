import Sidebar from "../Components/Sidebar";
// import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Topbar /> */}
        <main className="p-4 flex-grow">
          <Outlet /> {/* This renders the current page */}
        </main>
      </div>
    </div>
  );
}
