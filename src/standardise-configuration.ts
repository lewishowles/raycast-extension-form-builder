import { isNonEmptyString } from "./helpers";
import { tokenRegex, tokenMap, inputMap } from "./form-tokens";

type FieldConfiguration = {
	label: string,
	type?: string,
	name?: string,
	help?: string,
	placeholder?: string,
	prefix?: string,
	prefix_icon?: string,
	suffix?: string,
	suffix_icon?: string,
	id?: string,
}

/**
 * Convert the user's input into a standardised configuration, which can
 * itself be used to generate our form.
 *
 * @param  {string}  input
 *     The user's form input, to convert into a standardised configuration.
 */
export default function standardiseConfiguration(input: string) {
	if (!isNonEmptyString(input)) {
		return "";
	}

	// Start by splitting our configuration, expecting one input per line.
	const configurationLines = input.split("\n");

	return configurationLines.map(line => {
		// This splits our line into a list of [token, content, token, content],
		// etc.
		const parts = line.split(tokenRegex);

		const field: FieldConfiguration = { label: parts[0] };

		for (let i = 1; i < parts.length; i += 2) {
			let attribute = tokenMap[parts[i]];
			let content = parts[i + 1];

			if (!isNonEmptyString(attribute)|| !isNonEmptyString(content)) {
				continue;
			}

			switch (attribute) {
				case "type":
					content = inputMap[content] || "text";

					break;
				// For a prefix and suffix, if the content starts with `icon-`,
				// switch the attribute to the icon variant.
				case "prefix":
				case "suffix":
					if (content.startsWith("icon-")) {
						attribute = `${attribute}_icon`;
					}

					break;
			}

			field[attribute as keyof FieldConfiguration] = content;
		}

		// So that we don't need ot make any assumptions going forward, if we
		// cannot find a type, add our default.
		if (!Object.hasOwn(field, "type")) {
			field.type = "text";
		}

		return field;
	});

}
