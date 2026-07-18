import { supabase } from "../supabase/supabaseClient";

// ================= REGISTER =================
export const registerUser = async ({ nama, email, password }) => {
  // Register ke Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) throw error;

  // Simpan ke tabel profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      role_id: 2, // customer
      nama: nama.trim(),
      email: email.trim(),
    });

  if (profileError) throw profileError;

  return data;
};

// ================= LOGIN =================
export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) throw error;

  return data;
};