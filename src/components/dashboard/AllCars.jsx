import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOwnerCar, logout } from "../../store/ownerSlice";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const AllCars = () => {
  const owner = useSelector((store) => store.owner?.owner);
  const ownerCar = useSelector((store) => store.owner?.ownerCar);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetch all cars
  const fetchAllCars = async () => {
    try {
      const token = localStorage.getItem("ownertoken");
      if (!token) return;
      const res = await axios.get("/api/owner/owner-cars", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.car?.length === 0) {
        setErrorMessage("No Cars Found");
      } else {
        dispatch(setOwnerCar(res.data.car));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching cars");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ownertoken");
    dispatch(logout());
    navigate("/login");
  };

  // delete a car
  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("ownertoken");
    await axios.delete("/api/owner/delete-car", {
      headers: { Authorization: `Bearer ${token}` },
      data: { id }, 
    });
    toast.success("Car deleted successfully");
    fetchAllCars();
  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting car");
  }
};

  // update availability of car
  const handleChangeAvailability = async (id, value) => {
    try {
      const token = localStorage.getItem("ownertoken");
      await axios.patch(
        "/api/car/update",
        { id, avaliable: value }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Car availability updated");
      fetchAllCars();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating availability");
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between py-4 px-4 sm:px-6 border-b border-gray-300 bg-white">
        <h1
          onClick={() => navigate("/")}
          className="sm:text-3xl text-xl font-extrabold text-black cursor-pointer"
        >
          Welcome, <span className="text-blue-700">{owner?.name || "Owner"}</span>
        </h1>

        <button
          onClick={handleLogout}
          className="hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm bg-blue-700 transition-all cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Car Info */}
      <div className="p-4 w-full max-w-8xl mx-auto mt-4">
        {ownerCar?.length > 0 ? (
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full table-auto bg-white text-sm">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Model</th>
                  <th className="px-4 py-3 text-left">Purchase Year</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Registration Number</th>
                  <th className="px-4 py-3 text-left">Transmission</th>
                  <th className="px-4 py-3 text-left">Price/Day</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Availability</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ownerCar.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img
                        src={car.image}
                        alt={car.model}
                        className="w-20 h-12 rounded object-cover border"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{car.model}</td>
                    <td className="px-4 py-3">{car.yearOfPurchase}</td>
                    <td className="px-4 py-3">{car.type}</td>
                    <td className="px-4 py-3">{car.registrationNumber}</td>
                    <td className="px-4 py-3">{car.transmission}</td>
                    <td className="px-4 py-3">₹{car.pricePerDay}</td>
                    <td className="px-4 py-3">{car.location}</td>
                    <td className="px-4 py-3">
                      <select
                        value={car.avaliable}
                        onChange={(e) =>
                          handleChangeAvailability(car._id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="Avaliable">Available</option>
                        <option value="Not Avaliable">Not Available</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                        onClick={() => handleDelete(car._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm mt-6">
            {errorMessage || "Loading cars..."}
          </p>
        )}
      </div>
    </>
  );
};

export default AllCars;
