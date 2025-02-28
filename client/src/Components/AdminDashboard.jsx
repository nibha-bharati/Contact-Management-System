import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";

export default function AdminDashboard() {
  return (
    <>
    <Header/>
      <div className="grid">
        <div className="row-start-1 col-span-2">
          <AdminSidebar />
        </div>
        <div className="row-start-1 col-span-3">
          <h1 className="mt-20">
            Hello! <p>Please select an option from the sidebar.</p>
          </h1>
        </div>
      </div>
    </>
  );
}
