
/**
 * Combines the last names from two full names.
 *
 * @param name1 - The first full name.
 * @param name2 - The second full name.
 * @returns A string containing the last names from both full names, separated by a space.
 */
export function getFirstLastNames(name1: string, name2: string): string {
    const getLastName = (fullName: string): string => {
        const parts = fullName.split(' ');
        return parts.length > 1 ? parts[1] : '';
    };
    const lastName1 = getLastName(name1);
    const lastName2 = getLastName(name2);
    return `${lastName1} ${lastName2}`;
}