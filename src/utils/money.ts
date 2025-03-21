
/**
 * Formats a given amount to a local currency string based on the specified locale.
 *
 * @param amount - The numeric amount to be formatted.
 * @param locale - The locale string that determines the formatting style.
 * @returns A string representing the formatted currency.
 */
export function formatToLocalCurrency(amount: number, locale: string): string {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
    });
    return formatter.format(amount);
}