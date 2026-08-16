import { calculateProratedAmount } from "./subscription-calculator";

describe("calculateProratedAmount", () => {
  it("prorates correctly for a subscription starting near month-end in a 31-day month", () => {
    // $31.00/month, starting on day 29 of a 31-day month (e.g. January).
    // Correct daily rate: 3100 / 31 = 100 cents/day.
    // Correct remaining days: 31 - 29 + 1 = 3 days.
    // Correct prorated amount: 100 * 3 = 300 cents ($3.00).
    const result = calculateProratedAmount({
      monthlyRateCents: 3100,
      startDay: 29,
      daysInMonth: 31,
    });

    expect(result).toBe(300);
  });

  it("prorates correctly for a subscription starting mid-month in a 30-day month", () => {
    // $30.00/month, starting on day 15 of a 30-day month (e.g. April).
    // Correct daily rate: 3000 / 30 = 100 cents/day.
    // Correct remaining days: 30 - 15 + 1 = 16 days.
    // Correct prorated amount: 100 * 16 = 1600 cents ($16.00).
    const result = calculateProratedAmount({
      monthlyRateCents: 3000,
      startDay: 15,
      daysInMonth: 30,
    });

    expect(result).toBe(1600);
  });
});
