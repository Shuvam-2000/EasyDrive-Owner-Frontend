import { useSelector, useDispatch } from "react-redux";
import { logout, setOwnerCar } from "../../store/ownerSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import upload_area from "../../assets/upload_area.png";

const RegisterCar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const owner = useSelector((store) => store.owner?.owner);
  const ownerCar = useSelector((store) => store.owner?.ownerCar);

  // form states
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [type, setType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [seats, setSeats] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Generate Description with AI
 const handleAIDescription = async () => {
  if (!maker || !model || !fuelType || !yearOfPurchase || !type) {
    toast.error("Please fill the required fields.");
    return;
  }

  try {
    setLoadingAI(true);

    const token = localStorage.getItem("ownertoken");

    const res = await axios.post(
      "/api/owner/generate",
      {
        maker,
        model,
        fuelType,
        yearOfPurchase,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (res.data.success) {
      setDescription(res.data.description);
      toast.success("AI description generated!");
    } else {
      toast.error("Failed to generate description");
    }
  } catch (error) {
    console.error("AI Description Error:", error.response?.data || error.message);
    toast.error("Error generating description");
  } finally {
    setLoadingAI(false);
  }
};


  const registerNewCar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("ownertoken");
      if (!token) {
        toast.error("No owner token found");
        setIsSubmitting(false);
        return;
      }

      if (!image) {
        toast.error("Please upload an image");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("maker", maker);
      formData.append("model", model);
      formData.append("yearOfPurchase", yearOfPurchase);
      formData.append("type", type);
      formData.append("registrationNumber", registrationNumber);
      formData.append("fuelType", fuelType);
      formData.append("transmission", transmission);
      formData.append("seats", seats);
      formData.append("description", description);
      formData.append("pricePerDay", pricePerDay);
      formData.append("location", location);
      formData.append("image", image);

      const res = await axios.post("/api/car/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setOwnerCar([...ownerCar, res.data.car]));
      toast.success("Car Registered Successfully");
      navigate("/allcars");

      // reset form
      setMaker("");
      setModel("");
      setYearOfPurchase("");
      setType("");
      setRegistrationNumber("");
      setFuelType("");
      setTransmission("");
      setSeats("");
      setDescription("");
      setPricePerDay("");
      setLocation("");
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ownertoken");
    dispatch(logout());
    navigate("/login");
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

      {/* Register Car Form */}
      <form
        onSubmit={registerNewCar}
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 space-y-6"
      >
        {/* Upload Image */}
        <div className="flex justify-center">
          <label className="w-40 h-40 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer relative">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img src={upload_area} alt="Upload" className="w-12" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Maker"
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="number"
            placeholder="Year of Purchase"
            value={yearOfPurchase}
            onChange={(e) => setYearOfPurchase(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Car Type (e.g., SUV, Sedan)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Fuel Type (e.g., Petrol, Diesel)"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Transmission (Automatic/Manual)"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="number"
            placeholder="Seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="number"
            placeholder="Price Per Day"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Description with AI button */}
        <div className="relative">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-28 resize-none"
            required
          ></textarea>
          <button
            type="button"
            onClick={handleAIDescription}
            disabled={loadingAI}
            className="absolute bottom-4 right-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm shadow-md transition-all"
          >
            {loadingAI ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-lg transition-all"
        >
          {isSubmitting ? "Registering Car..." : "Register Car"}
        </button>
      </form>
    </>
  );
};

export default RegisterCar;
