import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import DashBoard from "./components/dashboard/DashBoard";
import "./index.css";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[2vw]">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route index element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
