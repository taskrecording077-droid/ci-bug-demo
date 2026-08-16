export interface ProrationInput {
  monthlyRateCents: number;
  startDay: number; // day of month the subscription starts (1-based)
  daysInMonth: number; // actual number of days in that calendar month
}

/**
 * Calculates the prorated charge for a subscription that starts partway
 * through a billing month, based on how many days remain in that month.
 */
export function calculateProratedAmount(input: ProrationInput): number {
  const { monthlyRateCents, startDay, daysInMonth } = input;

  // BUG: both the daily rate and the remaining-days count assume every
  // month has exactly 30 days. That's fine for a 30-day month, but for
  // any 31-day month it silently undercounts both the daily rate and
  // the number of remaining days — most visible for subscriptions that
  // start late in the month.
  const dailyRateCents = monthlyRateCents / 30;
  const remainingDays = 30 - startDay + 1;

  return Math.round(dailyRateCents * remainingDays);
}
