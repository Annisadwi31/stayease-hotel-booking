export const getBookings = async () => {
  return [
    { id: "booking-1", room: "Luxury Room", date: "15 Jun - 18 Jun 2026", status: "Confirmed", total: "$540" },
    { id: "booking-2", room: "Family Room", date: "22 Jun - 24 Jun 2026", status: "Pending", total: "$420" },
  ];
};

export const createBooking = async (bookingData) => {
  return { success: true, booking: { id: "booking-3", ...bookingData } };
};
