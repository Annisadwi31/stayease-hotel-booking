import React, { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async (session) => {
    if (!session?.user) {
      setUser(null);
      setRole(null);
      setLoading(false);
      return;
    }

    setUser(session.user);

    const { data, error } = await supabase
      .from("profiles")
      .select("role_id")
      .eq("id", session.user.id)
      .single();

    if (!error && data) {
      setRole(data.role_id);
    } else {
      setRole(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadUser(session);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      await loadUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      logout,
    }),
    [user, role, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;