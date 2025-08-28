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
     <div className="flex items-center justify-between py-4 px-4 sm:px-4 border-b border-gray-300 bg-white relative">
        {/* Owner Name */}
        <h1
          onClick={() => navigate("/")}
          className="sm:text-3xl text-xl font-extrabold text-black cursor-pointer"
        >
          Welcome,{" "}
          <span className="text-blue-700">
            {owner?.name ? owner.name : "Owner"}
          </span>
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm bg-blue-700 transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Owner Dashboard Cards */}
      <div>
        <DashboardCard />
      </div> 
    </>
  )
}

export default DashBoard