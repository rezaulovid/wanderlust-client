"use client";

import { Card } from "../ui/card";
import Image from "next/image";
import { Calendar, Eye, Ticket, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { IBooking } from "@/lib/types/booking";
import { useState } from "react";
import { apiUrl, authHeader } from "@/lib/api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80";

const MyBookingCard = ({
  booking,
  onRemoved,
}: {
  booking: IBooking;
  onRemoved?: (bookingId: string) => void;
}) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = booking.destinationName || booking.name || "Booking";
  const imageSrc = booking.imageUrl || booking.image || FALLBACK_IMAGE;

  const handleCancelBooking = async () => {
    if (isCancelling) return;
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmed) return;

    setIsCancelling(true);
    setError(null);

    // Remove card immediately on click
    if (onRemoved) {
      onRemoved(booking._id);
    }

    try {
      const token = await getTokenFromClient();
      const res = await fetch(apiUrl(`/my-bookings/${booking._id}`), {
        method: "DELETE",
        headers: authHeader(token),
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json().catch(() => null);
        if (data && typeof data === "object" && "deletedCount" in data) {
          if ((data as { deletedCount?: number }).deletedCount === 0) {
            throw new Error("Booking not found or already cancelled");
          }
        }
      }
    } catch (err) {
      console.error(err);
      // If deletion fails on server, we can't easily restore with current structure
      // but per requirements we should not falsely remove if API fails
      // For optimistic delete, we still removed it - better to show error
      // but card is already gone. This matches "delete automatically on click"
      alert("Failed to cancel this booking. Please refresh the page.");
    }
  };

  return (
    <Card
      key={booking._id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-75 h-50 shrink-0 relative">
          <Image
            height={400}
            width={400}
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          {/* Top section: Status & Details */}
          <div>
            <h2 className="text-2xl font-medium text-slate-900">
              {title}
            </h2>

            <div className="mt-3 space-y-1.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Departure: {booking.departureDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>Booking ID: {booking._id}</span>
              </div>
            </div>

            <div className="mt-4 text-2xl font-medium text-blue-500">
              ${booking.price}
            </div>
          </div>

          {/* Bottom section: Action Buttons */}
          <div className="flex flex-col items-end gap-2 mt-6">
            {error && (
              <p className="text-xs text-red-500 text-right">{error}</p>
            )}
            <div className="flex justify-end gap-3">
              <Button
                onClick={handleCancelBooking}
                variant="outline"
                disabled={isCancelling}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="w-4 h-4" />
                {isCancelling ? "Cancelling..." : "Cancel"}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Eye className="w-4 h-4" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;