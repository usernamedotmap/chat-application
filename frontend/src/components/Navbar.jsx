import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Cat, CircleUser, Cog, LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/50">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to={"/"}
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/50 flex items-center justify-center">
              <Cat className="size-6 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chat Mood</h1>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={"/setting"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Cog className="size-5" />
              <span className="hidden:sm-inline">Setting</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 ">
                <CircleUser className="size-5" />
                <span className="hidden:sm-inline">Profile</span>
                </Link>

                <button onClick={logout} className="flex gap-2 items-center">
                <LogOut className="size-5" />
                <span className="hidden:sm-inline">Logout</span>
                
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
