export const LAUNCH_DATE = "April 17th";

// Monthly recurring
export const PRICE_MONTHLY_EARLY = 4.99;
export const PRICE_MONTHLY_REGULAR = 9.99;

// Annual flat price (2 months free vs monthly)
export const PRICE_ANNUAL_TOTAL_EARLY = 49.99;
export const PRICE_ANNUAL_TOTAL_REGULAR = 99.99;

// Effective per-month rate when billed annually
export const PRICE_ANNUAL_EARLY = parseFloat((PRICE_ANNUAL_TOTAL_EARLY / 12).toFixed(2));     // 4.17
export const PRICE_ANNUAL_REGULAR = parseFloat((PRICE_ANNUAL_TOTAL_REGULAR / 12).toFixed(2)); // 8.33

export const ANNUAL_SAVINGS_PCT = Math.round(
  ((PRICE_MONTHLY_EARLY - PRICE_ANNUAL_EARLY) / PRICE_MONTHLY_EARLY) * 100,
);
