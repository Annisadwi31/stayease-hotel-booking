import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

const Navbar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const menuRef = useRef();

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (!user) {
      setProfile(null);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          StayEase
        </Link>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          className={`${
            open ? "block" : "hidden"
          } absolute left-0 top-20 w-full bg-white p-6 lg:static lg:block lg:w-auto lg:bg-transparent lg:p-0`}
        >
          <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/rooms">Rooms</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {user ? (
          <div
            className="relative"
            ref={menuRef}
          >
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-slate-100"
            >
              <FaUserCircle className="text-2xl text-blue-600" />

              <span className="font-medium">
                {profile?.nama}
              </span>
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-lg">

                <Link
                  to="/my-booking"
                  className="block px-5 py-3 hover:bg-slate-100"
                >
                  📅 My Booking
                </Link>


                <button
                  onClick={logout}
                  className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Book Now
          </Link>
        )}

      </div>
    </header>
  );
};

export default Navbar;