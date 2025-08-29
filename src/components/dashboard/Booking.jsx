import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout, setOwnerBookings } from "../../store/ownerSlice";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const shippingStatusColors = {
  Booked: "bg-yellow-100 text-yellow-700",
  Online: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const owner = useSelector((store) => store.owner?.owner);
  const ownerBookings = useSelector((store) => store.owner?.ownerBookings) || [];
  const [errorMessage, setErrorMessage] = useState("");

  // fetching the bookings for the owner
  const fetchAllBookings = async () => {
    try {
      const ownertoken = localStorage.getItem("ownertoken");
      if (!ownertoken) return;

      const res = await axios.get("/api/rental/owner-booking", {
        headers: { Authorization: `Bearer ${ownertoken}` },
      });
      dispatch(setOwnerBookings(res.data?.bookings || []));
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Error Fetching Orders"
      );
    }
  };

  useEffect(() => {
    fetchAllBookings();
  });

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("ownertoken");
    dispatch(logout());
    navigate("/login");
  };

  // booking status update
  const bookingStatusUpdate = async (bookId, updateStatus) => {
    try {
      const ownertoken = localStorage.getItem("ownertoken");
      if (!ownertoken) return;

      await axios.patch(
        "/api/rental/update-booking",
        {
          bookingId: bookId, // send bookingId in body,
          status: updateStatus, // send updatedstatus in body
        },
        {
          headers: { Authorization: `Bearer ${ownertoken}` },
        }
      );
      // update UI locally
      const updatedBookings = ownerBookings.map((booking) =>
        booking._id === bookId
          ? {
              ...booking,
              status: updateStatus,
            }
          : booking
      );
      dispatch(setOwnerBookings(updatedBookings));
      toast.success("Booking Status Updated Successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-4 sm:px-8 border-b border-gray-300 bg-white">
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

      {/* Bookings Table */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Bookings</h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {ownerBookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Customer</th>
                  <th className="py-3 px-4 border-b text-left">Car</th>
                  <th className="py-3 px-4 border-b text-left">Start Date</th>
                  <th className="py-3 px-4 border-b text-left">End Date</th>
                  <th className="py-3 px-4 border-b text-left">Total Price</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                  <th className="py-3 px-4 border-b text-left">
                    Payment Method
                  </th>
                  <th className="py-3 px-4 border-b text-left">
                    Payment Status
                  </th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {ownerBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 border-b">
                      {booking.customer?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {booking.car?.model || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b font-semibold">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shippingStatusColors[booking.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      {booking.paymentMethod}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : booking.paymentStatus === "Failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          bookingStatusUpdate(booking._id, e.target.value)
                        }
                        className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="Booked">Booked</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
