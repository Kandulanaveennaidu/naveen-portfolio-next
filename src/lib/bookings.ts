// Simple in-memory storage for booked slots
// In production, you would use a database like MongoDB, PostgreSQL, etc.

interface BookedSlot {
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: "09:00 AM"
  meetingId: string;
  customerEmail: string;
  bookedAt: Date;
}

// Store booked slots in memory (resets on server restart)
// For production, use a database!
const bookedSlots: BookedSlot[] = [];

/**
 * Check if a specific slot is already booked
 */
export function isSlotBooked(date: string, time: string): boolean {
  return bookedSlots.some((slot) => slot.date === date && slot.time === time);
}

/**
 * Get all booked slots for a specific date
 */
export function getBookedSlotsForDate(date: string): string[] {
  return bookedSlots
    .filter((slot) => slot.date === date)
    .map((slot) => slot.time);
}

/**
 * Get all booked slots for a date range
 */
export function getBookedSlotsForDateRange(
  startDate: string,
  endDate: string
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  bookedSlots.forEach((slot) => {
    if (slot.date >= startDate && slot.date <= endDate) {
      if (!result[slot.date]) {
        result[slot.date] = [];
      }
      result[slot.date].push(slot.time);
    }
  });

  return result;
}

/**
 * Book a new slot
 */
export function bookSlot(
  date: string,
  time: string,
  meetingId: string,
  customerEmail: string
): { success: boolean; error?: string } {
  // Check if slot is already booked
  if (isSlotBooked(date, time)) {
    return {
      success: false,
      error: "This time slot is already booked. Please select another time.",
    };
  }

  // Add the booking
  bookedSlots.push({
    date,
    time,
    meetingId,
    customerEmail,
    bookedAt: new Date(),
  });

  console.log(`Slot booked: ${date} at ${time} for ${customerEmail}`);
  return { success: true };
}

/**
 * Cancel a booking (for future use)
 */
export function cancelBooking(
  date: string,
  time: string,
  customerEmail: string
): boolean {
  const index = bookedSlots.findIndex(
    (slot) =>
      slot.date === date &&
      slot.time === time &&
      slot.customerEmail === customerEmail
  );

  if (index !== -1) {
    bookedSlots.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Get all bookings (for admin purposes)
 */
export function getAllBookings(): BookedSlot[] {
  return [...bookedSlots];
}
