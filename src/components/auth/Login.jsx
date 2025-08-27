import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios"
import toast from "react-hot-toast";
import { setOwner } from "../../store/ownerSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/owner/owner-login", data);
      const ownertoken = res.data?.token;
      if (ownertoken) {
        localStorage.setItem("ownertoken", ownertoken);
        dispatch(setOwner(res.data?.owner));
        toast.success(res.data?.message || "Login Sucessful");
        navigate("/");
        reset();
      } else {
        toast.error(res.data?.message || "Error Login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      reset();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-3xl font-mono font-bold text-gray-800">
            Owner Login
          </p>
          <div className="w-12 h-1 bg-primary-dull mt-2 rounded-full" />
        </div>

        {/* Email Field */}
        <input
          type="text"
          className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
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
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <input
          type="password"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className={`bg-blue-500 text-white font-mono px-10 py-2 mt-6 rounded-lg shadow-md transition-all cursor-pointer ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-primary-dark"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't Have An Account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-primary-dull cursor-pointer hover:underline"
            >
              SignUp
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
