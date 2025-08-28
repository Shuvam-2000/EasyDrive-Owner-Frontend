import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import DashBoard from "./components/dashboard/DashBoard";
import AllCars from "./components/dashboard/AllCars";
import RegisterCar from "./components/dashboard/RegisterCar";
import Booking from "./components/dashboard/Booking";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[2vw]">
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allcars"
            element={
              <ProtectedRoute>
                <AllCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registercar"
            element={
              <ProtectedRoute>
                <RegisterCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
