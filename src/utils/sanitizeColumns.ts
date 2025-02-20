/**
 * Sanitize the keys of an object by removing extra spaces and converting to lowercase.
 * @param obj - The object to be sanitized.
 * @returns The object with sanitized keys.
 */
function sanitizeKeys<T extends Record<string, string | number>>(obj: T): Record<string, string | number> {
    const sanitizedObject: Record<string, string | number> = {};
  
    for (const key in obj) {
      const sanitizedKey = key.trim().toLowerCase(); // Remove extra spaces and convert to lowercase.
      sanitizedObject[sanitizedKey] = obj[key];
    }
  
    return sanitizedObject;
  }
  
  /**
   * Sanitize the keys of an array of objects.
   * @param array - The array of objects to be sanitized.
   * @returns The array of objects with sanitized keys.
   */
  export default function sanitizeColumns(array: Array<Record<string, string | number>>): Array<Record<string, string | number>> {
    return array.map((object) => sanitizeKeys(object));
  }
  