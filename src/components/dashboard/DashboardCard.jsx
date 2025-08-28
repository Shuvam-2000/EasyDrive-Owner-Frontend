import { Car, PlusSquare, CalendarCheck, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardCard = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl sm:mt-30 mt-20">
        
        {/* All Cars */}
        <div onClick={() => navigate("/allcars")} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl h-60 p-10 flex flex-col items-center justify-center text-center cursor-pointer">
          <Car className="w-12 h-12 text-blue-600" />
          <h2 className="text-2xl font-semibold mt-6">All Your Cars</h2>
        </div>

        {/* Register New Car */}
        <div onClick={() => navigate("/registercar")} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl h-60 p-10 flex flex-col items-center justify-center text-center cursor-pointer">
          <PlusSquare className="w-12 h-12 text-blue-600" />
          <h2 className="text-2xl font-semibold mt-6">Register New Car</h2>
        </div>

        {/* Manage Bookings */}
        <div onClick={() => navigate("/booking")} className="bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl h-60 p-10 flex flex-col items-center justify-center text-center cursor-pointer">
          <CalendarCheck className="w-12 h-12 text-blue-600" />
          <h2 className="text-2xl font-semibold mt-6">Manage Your Bookings</h2>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard