export interface IBooking {
  _id: string;
  username?: string;
  email?: string;
  image?: string;
  destinationName?: string;
  name?: string;
  country?: string;
  category?: string;
  price?: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  bookingDate?: string;
  status?: string;
}
