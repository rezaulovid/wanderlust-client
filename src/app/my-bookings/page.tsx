"use client";

import { useEffect, useState } from "react";
import MyBookingCard from "@/components/booking/MyBookingCard";
import { IBooking } from "@/lib/types/booking";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { apiUrl } from "@/lib/api";

const MyBookingsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const token = await getTokenFromClient();
        const res = await fetch(
          apiUrl(`/my-bookings/${encodeURIComponent(user.email)}`),
          {
            headers: token ? { authorization: `Bearer ${token}` } : {},
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to load bookings");
        }
        const data: IBooking[] = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load your bookings right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchBookings();
    }
  }, [user?.email, isPending]);

  const handleRemoveBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.filter((booking) => booking._id !== bookingId)
    );
  };

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 md:px-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Bookings List */}
      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading bookings...</p>
      ) : error ? (
        <p className="mt-10 text-sm text-muted-foreground">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No bookings found.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map((booking) => {
            return (
              <MyBookingCard
                booking={booking}
                key={booking._id}
                onRemoved={handleRemoveBooking}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;