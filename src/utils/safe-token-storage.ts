
/**
 * Retrieves an item from local storage by its key.
 *
 * @param {string} key - The key of the item to retrieve from local storage.
 * @returns {any | null} The item from local storage if it exists, otherwise null.
 */
export function getSafeKeyObjectFromStorage(key: string): any | null {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key) ?? null;
    }

    return null;
}