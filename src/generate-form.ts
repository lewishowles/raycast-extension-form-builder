import { isNonEmptyArray, isNonEmptyObject, pick } from "./helpers";
import { FieldConfiguration } from "./types";

/**
 * Given a form configuration produced by `standardiseConfiguration`, generate a
 * string representing the resulting form, which the user will be able to use in
 * their project.
 *
 * @param  {FieldConfiguration[]}  formConfiguration
 *     The configuration to convert into a template.
 */
export default function generateForm(formConfiguration: FieldConfiguration[]) {
	if (!isNonEmptyArray(formConfiguration)) {
		return "";
	}

	let templateString = "";

	formConfiguration.forEach((field, index) => {
		if (!isNonEmptyObject(field)) {
			return;
		}

		templateString += generateTemplate(field);

		if (index < formConfiguration.length - 1) {
			templateString += "\n\n";
		}
	});

	// We split our form field string so that we can indent each line
	// appropriately to match the form wrapper.
	const indentedFormFields = templateString.split("\n").map(line => `\t${line}`).join("\n");

	return `<form-wrapper v-model="formData" @submit="createUser">
${indentedFormFields}

	<template #submit-button-label>
		Create user
	</template>
</form-wrapper>`;
}

/**
 * Generate a string template for a `form-field`, based on the provided
 * configuration.
 *
 * @param  {FieldConfiguration}  fieldConfig
 *     The configuration for the field to generate.
 */
function generateTemplate(fieldConfig: FieldConfiguration) {
	let template = `<form-field${generateFieldBindings(fieldConfig)}>`;

	template += `\n\t${fieldConfig.label}`;

	const slots = pick(fieldConfig, ["help", "prefix", "suffix", "prefix_icon", "suffix_icon"]);

	if (isNonEmptyObject(slots)) {
		for (const slot in slots) {
			if (Object.prototype.hasOwnProperty.call(slots, slot)) {
				template += generateSlot(slot, slots[slot] as string);
			}
		}
	}

	template += "\n</form-field>";

	return template;
}

/**
 * Generate a string of v-bind bindings to apply to a `form-field` template.
 *
 * @param  {FieldConfiguration}  fieldConfig
 *     The configuration for the bindings to generate.
 */
function generateFieldBindings(fieldConfig: FieldConfiguration) {
	if (!isNonEmptyObject(fieldConfig)) {
		return "";
	}

	const bindings = pick(fieldConfig, ["type", "name", "placeholder", "id"]);

	if (!isNonEmptyObject(bindings)) {
		return "";
	}

	// For selects, radio groups and button groups, add a pseudo options field.
	// We don't provide an options token because options shouldn't be hard-coded
	// in the form, so it's unnecessary processing.
	if (["select", "radio-group", "button-group"].includes(fieldConfig.type)) {
		bindings.options = null;
	}

	return ` v-bind="{ ${Object.entries(bindings).map(([key, value]) => {
		// We have slightly different handing for options, as it won't be a
		// hard-coded value.
		if (key === "options") {
			return key;
		}

		return `${key}: '${value}'`;
	}).join(", ")} }"`;
}

/**
 * Generate a string representing a slot and its content, ready for placing
 * inside a field template.
 *
 * @param  {string}  slotName
 *     The name of the slot to generate.
 * @param  {string}  slotContent
 *     The content of the slot to generate.
 */
function generateSlot(slotName: string, slotContent: string) {
	if (["prefix_icon", "suffix_icon"].includes(slotName) && slotContent.startsWith("icon-")) {
		return `\n\n\t<template #${slotName.replace("_icon", "")}>\n\t\t<${slotContent} />\n\t</template>`;
	}

	return `\n\n\t<template #${slotName}>\n\t\t${slotContent}\n\t</template>`;
}
