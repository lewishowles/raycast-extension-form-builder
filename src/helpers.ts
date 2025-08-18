/**
 * Determine if a given variable is a string, and non-empty.
 *
 * @param	{mixed}	variable
 *		 The variable to test.
	*/
export function isNonEmptyString(variable: unknown): variable is string {
	return typeof variable === "string" && variable !== "";
}
