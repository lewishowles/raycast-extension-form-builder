// Our available tokens.
export const tokens = {
	TYPE: "/",
	NAME: "@",
	HELP: "?",
	PLACEHOLDER: "|",
	PREFIX: "<",
	SUFFIX: ">",
	ID: "#",
};

// Our conversion table from token to configuration attribute.
export const tokenMap = {
	[tokens.TYPE]: "type",
	[tokens.NAME]: "name",
	[tokens.HELP]: "help",
	[tokens.PLACEHOLDER]: "placeholder",
	[tokens.PREFIX]: "prefix",
	[tokens.SUFFIX]: "suffix",
	[tokens.ID]: "id",
};

// Our available input tokens.
export const inputTokens = {
	TEXT: "i",
	TEXTAREA: "ta",
	SELECT: "s",
	CHECKBOX: "cb",
	RADIO_GROUP: "rbg",
	BUTTON_GROUP: "bg",
};

// Our conversion table from input token to form-field input type.
export const inputMap = {
	[inputTokens.TEXT]: "text",
	[inputTokens.TEXTAREA]: "textarea",
	[inputTokens.SELECT]: "select",
	[inputTokens.CHECKBOX]: "checkbox",
	[inputTokens.RADIO_GROUP]: "radio-group",
	[inputTokens.BUTTON_GROUP]: "button-group",
};

// Our RegEx tokens, based on our shortcuts.
export const tokenList = Object.keys(tokenMap).map(token => `\\${token}`).join("|");
export const tokenRegex = new RegExp(`(${tokenList})`, "g");
