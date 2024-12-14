import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Cat,
  Container,
  Eye,
  EyeClosed,
  Lock,
  VenetianMask,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "./AuthImagePattern";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSignUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Fullname is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length > 6)
      return toast.error("Password must be 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success == true) signup(formData);
  };
  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* logo part */}
            <div className="text-center my-10">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors"
                >
                  <Cat className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                <p className="text-base-content/60">Get me for free</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <VenetianMask className="size-5 text-base-content/40" />
                  </div>

                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`input input-bordered w-full pl-10`}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    value={formData.fullName}
                  />
                </div>

                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Container className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`input input-bordered w-full pl-10`}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    value={formData.email}
                  />
                </div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className={`input input-bordered w-full pl-10`}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    value={formData.password}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="size-5 text-base-content/40" />
                    ) : (
                      <EyeClosed className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSignUp}
              >
                {isSignUp ? (
                  <>
                    <span className="loading loading-spinner text-neutral"></span>
                  </>
                ) : (
                  "Signup"
                )}
              </button>
            </form>
            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to={"/login"} className="link link-primary ">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side */}

        <AuthImagePattern title="Join to me please" subtitle="Connect to me" />
      </div>
    </>
  );
};

export default Signup;
