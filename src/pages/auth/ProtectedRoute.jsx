import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkUser = async () => {

      const {
        data: { user }
      } = await supabase.auth.getUser();


      // belum login
      if (!user) {
        setLoading(false);
        return;
      }


      // ambil role user
      const { data: profile } = await supabase
        .from("profiles")
        .select("role_id")
        .eq("id", user.id)
        .single();


      if (profile) {
        setRole(profile.role_id);
      }

      setLoading(false);
    };


    checkUser();

  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  // belum login
  if (!role) {
    return <Navigate to="/login" />;
  }


  // role tidak sesuai
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }


  return children;
};


export default ProtectedRoute;