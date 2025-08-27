import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/owner/owner-register", data);
      toast.success(res.data?.message || "SignUp Successfully");
      reset();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-6">
          <p className="text-3xl font-mono font-bold text-gray-800">
            Owner Signup
          </p>
          <div className="w-12 h-1 bg-primary-dull mt-2 rounded-full" />
        </div>

        {/* Name Field */}
        <input
          type="text"
          className={`w-full mb-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-xs text-red-500 -mt-3 mb-2">
            {errors.name.message}
          </p>
        )}

        {/* Email Field */}
        <input
          type="text"
          className={`w-full mb-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-xs text-red-500 -mt-3 mb-2">
            {errors.email.message}
          </p>
        )}

        {/* Phone Field */}
        <input
          type="tel"
          className={`w-full mb-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 -mt-3 mb-2">
            {errors.phone.message}
          </p>
        )}

        {/* Password Field */}
        <input
          type="password"
          className={`w-full mb-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-xs text-red-500 -mt-3 mb-2">
            {errors.password.message}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className={`bg-blue-500 text-white font-mono px-10 py-2 mt-2 rounded-lg transition-all cursor-pointer ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-primary"
            }`}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary-dull cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
