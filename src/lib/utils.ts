import { format } from "date-fns";
import { cs } from "date-fns/locale";

/**
 * Formats a date using date-fns with Czech locale
 * @param date Date to format (string or Date object)
 * @param formatStr Format string (defaults to 'PPP')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  formatStr: string = "PPP"
): string {
  return format(new Date(date), formatStr, { locale: cs });
}

/**
 * Formats a number as Czech currency
 * @param amount Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString()} Kč`;
}

/**
 * Interface for VAT calculation result
 */
interface VATResult {
  withVAT: number;
  withoutVAT: number;
  vatAmount: number;
}

/**
 * Calculates VAT for a given amount
 * @param amount Total amount with VAT
 * @param rate VAT rate (defaults to 0.21 which is 21%)
 * @returns Object containing the amount with VAT, without VAT, and the VAT amount
 */
export function calculateVAT(amount: number, rate: number = 0.21): VATResult {
  const vatAmount = amount * rate;
  const withoutVAT = amount - vatAmount;

  return {
    withVAT: amount,
    withoutVAT,
    vatAmount,
  };
}
