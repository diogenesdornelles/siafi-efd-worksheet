/**
 * Sanitize the keys of an object by removing extra spaces and converting to lowercase.
 * @param {object} obj - The object to be sanitized.
 * @returns {object} The object with sanitized keys.
 */
function sanitizeKeys(obj) {
  const sanitizedObject = {};

  for (const key in obj) {
    const sanitizedKey = key.trim().toLowerCase(); // Remove extra spaces and convert to lowercase.
    sanitizedObject[sanitizedKey] = obj[key];
  }

  return sanitizedObject;
}

/**
 * Sanitize the keys of an array of objects.
 * @param {object[]} array - The array of objects to be sanitized.
 * @returns {object[]} The array of objects with sanitized keys.
 */
export default function sanitizeColumns(array) {
  return array.map((object) => sanitizeKeys(object));
}
