import { useNavigate } from "react-router-dom";

export default function Header() {
    const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <header className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Contact Management System
            </h2>

            
          </div>

          <div className="flex items-center gap-4">
           

            <button
              className="inline-block rounded-sm bg-indigo-600 px-5 py-3 text-sm font-medium text-black transition hover:bg-indigo-700 focus:ring-3 focus:outline-hidden"
              type="button" onClick={logout}
            >
             Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
