export const getRooms = async () => {
  return [
    { id: "room-1", name: "Luxury Room", price: 180, rating: 4.9 },
    { id: "room-2", name: "Deluxe Room", price: 140, rating: 4.7 },
    { id: "room-3", name: "Family Room", price: 210, rating: 4.8 },
  ];
};

export const getRoomDetails = async (roomId) => {
  return { id: roomId, name: "Luxury Room", price: 180, rating: 4.9, description: "Beautiful hotel room with premium amenities." };
};
