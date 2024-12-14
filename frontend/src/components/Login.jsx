import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Cat, Container, Eye, EyeClosed, Lock } from "lucide-react";
import AuthImagePattern from "./AuthImagePattern";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
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
                <h1 className="text-2xl font-bold mt-2">Hellooo, IMISSYOU</h1>
                <p className="text-base-content/60">wELcomE hOmE</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
               

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
                    type="button"
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
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <span className="loading loading-spinner text-neutral"></span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className="text-center">
              <p className="text-base-content/60">
                 {`Don't have an account? `}
                <Link to={"/signup"} className="link link-primary">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side */}

        <AuthImagePattern title="First move to first try" subtitle="Meow" />
      </div>
    </>
  );
};

export default Login;
