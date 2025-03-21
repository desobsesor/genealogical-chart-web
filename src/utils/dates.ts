import moment from "moment";

/**
 * Compare two dates and determine if the first date is earlier than the second.
 * 
 * @param {any} date1 - The first date to compare. Can be a string or a Date object.
 * @param {any} date2 - The second date to compare. Can be a string or a Date object.
 * @returns {boolean} - Returns true if the first date is before the second, false otherwise.
 * 
 * @throws {Error} - Throws an error if any of the supplied dates are invalid.
 *
 * @example
 * isDateBefore('2023-10-26', new Date('2023-10-27')); // true
 * isDateBefore('2023-10-27', '2023-10-26'); // false
 * isDateBefore('invalid date', new Date('2023-10-27')); // throws an error
 */
export function isDateBefore(date1: any, date2: any): boolean {
  const parsedDate1 = moment(date1).toDate();
  const parsedDate2 = moment(date2).toDate();

  if (isNaN(parsedDate1.getTime()) || isNaN(parsedDate2.getTime())) {
    throw new Error('Invalid date format');
  }

  return moment(parsedDate1).isBefore(parsedDate2);
}

// Function to format the selected date using Moment.js
export const formatDate = (date: Date | null, format: string): string => {
  if (!date) {
    return 'Select a date';
  }
  return moment(date).format(format);
};

export const validateDate = (selectedDate: Date, minDate?: Date, maxDate?: Date): boolean => {
  try {
    if (minDate) {
      if (selectedDate < minDate) {
        console.info('Selected date is earlier than the minimum date');
        return false;
      }
    }

    if (maxDate) {
      if (selectedDate > maxDate) {
        console.info('Selected date is later than the maximum date');
        return false;
      }
    }

    return true;
  } catch (error) {
    //console.log('Error in validateDate method:', error)
    return false;
  }
};

export const addDaysToDate = (date: Date, daysToAdd: number): Date => {
  const newDate = new Date(date.getTime());
  newDate.setDate(date.getDate() + daysToAdd);
  return newDate;
};

export const validateDateWithError = (selectedDate: any, minDate?: Date, maxDate?: Date): [boolean, string | undefined] => {
  let errorMessage: string | undefined;

  if (selectedDate == 'Select a date') {
    errorMessage = 'Select a date';
    return [false, errorMessage];
  }

  if (minDate) {
    if (selectedDate < minDate) {
      errorMessage = 'Selected date is earlier than the minimum date';
      return [false, errorMessage];
    }
  }

  if (maxDate) {
    if (selectedDate > maxDate) {
      errorMessage = 'Selected date is later than the maximum date';
      return [false, errorMessage];
    }
  }


  return [true, errorMessage];
};

/*
// implements
const handleAddDays = () => {
  if (selectedDate) {
    const updatedDate = addDaysToDate(selectedDate, daysToAdd);
    setSelectedDate(updatedDate);
  } else {
    console.error('No date selected to add days to');
  }
};
*/

export const subtractDaysToDate = (date: Date, daysToSubtract: number): Date => {
  const newDate = new Date(date.valueOf()); // Create a copy of the date
  newDate.setDate(date.getDate() - daysToSubtract); // Subtract days from the date
  return newDate;
};

/*
// implements
  const handleSubtractDays = () => {
  if (selectedDate) {
    const subtractedDate = subtractDaysToDate(selectedDate, daysToSubtract);
    setSelectedDate(subtractedDate);
  }
};
*/

export function dateToNumber(fecha: Date): number {
  const fechaISO = fecha.toISOString();
  return parseInt(fechaISO.replace(/\D/g, ''), 10);
}

export const isDate = (str: string): boolean => {
  const date = new Date(str);
  return !isNaN(date.getTime()) && date.toString() !== 'Invalid Date';
};

export const getDaysInMora = (expirationDate: Date): number => {
  try {
    const today = new Date();
    const differenceInMillis = today.getTime() - expirationDate.getTime();
    const daysInMora = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return daysInMora;
  } catch (error) {
    return 0;
  }
}

export const getYearCurrent = (): number => {
  const yearCurrent = new Date();
  return yearCurrent.getFullYear();
}

export const getYearCurrentTwoDigits = (): string => {
  const year = new Date().getFullYear().toString().slice(-2);
  return year;
}

/**
 * Genera la primera y la última fecha dado un año especifico.
 *
 * @param {string} yearString - El año como una cadena de texto (ej: "2023").
 * @returns {{ firstDay: Date | null; lastDay: Date | null }} Un objeto con la primera y última fecha del año, o null si el año es inválido.
 */
export const getFirstAndLastDayOfYear = (yearString: string): { firstDay: Date | null; lastDay: Date | null } => {
  const year = parseInt(yearString, 10);
  if (isNaN(year)) {
    console.error("Error: El año proporcionado no es un número válido.");
    return { firstDay: null, lastDay: null };
  }
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  return { firstDay, lastDay };
}