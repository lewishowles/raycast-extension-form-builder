/**
 * Determine if a given variable is a string, and non-empty.
 *
 * @param	{mixed}	variable
 *		 The variable to test.
 */
export function isNonEmptyString(variable: unknown): variable is string {
	return typeof variable === "string" && variable !== "";
}

/**
 * Determine whether the given variable is an array and has at least one entry.
 *
 * isNonEmptyArray(['A', 'B', 'C', 'D']); // true
 * isNonEmptyArray([]); // false
 * isNonEmptyArray("string"); // false
 *
 * @param  {unknown}  variable
 *	 The variable to test.
 */
export function isNonEmptyArray(variable: unknown): variable is unknown[] {
	return Array.isArray(variable) && variable.length > 0;
}

/**
 * Determine if the provided variable is an object - excluding arrays and null.
 *
 * isObject({ property: "value" }); // true
 * isObject(['A', 'B', 'C', 'D']); // false
 * isObject(null); // false
 *
 * @param  {unknown}  variable
 *     The variable to test.
 */
export function isObject(variable: unknown): variable is Record<string, unknown> {
	return typeof variable === "object" && !Array.isArray(variable) && variable !== null;
}

/**
 * Determine whether the given variable is an object and has at least one
 * property.
 *
 * isNonEmptyObject({ property: "value" }); // true
 * isNonEmptyObject({}); // false
 * isNonEmptyObject("string"); // false
 *
 * @param  {unknown}  variable
 *     The variable to test.
 */
export function isNonEmptyObject(variable: unknown): variable is Record<string, unknown> {
	return isObject(variable) && Object.keys(variable).length > 0;
}

/**
 * Retrieve the given properties from the provided object.
 *
 * If a property does not exist on the object, it is ignored.
 *
 * @param  {object}  object
 *     The object from which to pick properties.
 * @param  {array}  properties
 *     The properties to pick.
 */
export function pick(object: unknown, properties: string[]) {
	if (!isNonEmptyObject(object) || !isNonEmptyArray(properties)) {
		return {};
	}

	return properties.reduce((newObject: Record<string, unknown>, property: string) => {
		if (Object.hasOwn(object, property)) {
			newObject[property] = object[property];
		}

		return newObject;
	}, {});
}
