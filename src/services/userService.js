export const getUsers = async () => {
  return [
    { id: "user-1", name: "Alex Morgan", email: "alex@example.com", role: "Customer" },
    { id: "user-2", name: "Maya Indah", email: "maya@example.com", role: "Admin" },
  ];
};

export const getUserProfile = async (userId) => {
  return { id: userId, name: "Alex Morgan", email: "alex@example.com" };
};
