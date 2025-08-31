import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/ownerSlice";
import DashboardCard from "./DashboardCard";

const DashBoard = () => {
  const owner = useSelector((store) => store.owner?.owner);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("ownertoken");
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-4 sm:px-6 border-b border-gray-300 bg-white relative">
        <h1
          onClick={() => navigate("/")}
          className="sm:text-3xl text-xl font-extrabold text-black cursor-pointer"
        >
          Welcome,{" "}
          <span className="text-blue-700">
            {owner?.name ? owner.name : "Owner"}
          </span>
        </h1>

        <button
          onClick={handleLogout}
          className="hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm bg-blue-700 transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* EasyDrive Owner Portal Title */}
      <div className="py-6 px-4 sm:px-6 bg-gray-50 rounded-lg mt-6 max-w-6xl mx-auto shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          EasyDrive Owner Portal
        </h2>
      </div>

      {/* Owner Dashboard Cards */}
      <div className="mt-6 max-w-6xl mx-auto px-4 sm:px-6">
        <DashboardCard />
      </div>
    </>
  )
}

export default DashBoard;
