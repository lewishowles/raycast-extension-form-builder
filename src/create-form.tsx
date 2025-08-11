import { Action, ActionPanel, Clipboard, Detail, Form, Toast, showToast, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";

interface FormBuilderFormValues {
	configuration: string;
};

/**
 * Generate a VS Code snippet that can be pasted into a snippet file from a
 * block of code, title, and prefix.
 */
export default function Command() {
	const { handleSubmit, itemProps } = useForm<FormBuilderFormValues>({
		async onSubmit(formValues) {
			if (typeof formValues !== "object") {
				return;
			}

			console.log(formValues);

			//const snippet = generateSnippet(formValues.title, formValues.prefix, formValues.code);

			//await Clipboard.copy(snippet);

			//showToast({
			//	style: Toast.Style.Success,
			//	title: "Snippet copied",
			//	message: "You can now paste it into the appropriate file.",
			//});
		},
		//validation: {
		//	configuration: value => {
		//		if (!value) {
		//			return "Please enter the configuration to convert";
		//		}
		//	},
		//},
	});

	/**
	 * Determine if a given variable is a string, and non-empty.
	 *
	 * @param	{mixed}	variable
	 *		 The variable to test.
	 */
	//function isNonEmptyString(variable: unknown): variable is string {
	//	return typeof variable === "string" && variable !== "";
	//}

	return (
		<Form
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Generate Form" onSubmit={handleSubmit} />
					<Action.Push title="View Shortcut Guide" target={<ShortcutGuide />} />
				</ActionPanel>
			}
		>
			<Form.Description text="Enter your configuration to generate a form. Each line represents a different field in the form." />
			<Form.TextArea title="Configuration" {...itemProps.configuration} />
			<Form.Description text="View the Shortcut Guide in Actions." />
		</Form>
	);
}

function ShortcutGuide() {
	const { pop } = useNavigation();

	return (
		<Detail
			markdown={shortcutGuideMarkdown}
			actions={
				<ActionPanel>
					<Action title="Back to Form" onAction={pop} />
				</ActionPanel>
			}
		/>
	);
}

const shortcutGuideMarkdown = `
## Shortcut Guide

Each field starts with the field's label, followed by one or more configuration options.

### Name

**Field name \`@\` \`required\`**

The name of the field, which is used to retrieve data from the form's model. This is required as the output form will use \`form-wrapper\`.

---

**Field type \`/\`**

One of: \`i\` (input), \`ta\` (textarea), \`s\` (select), \`cb\` (checkbox), \`rbg\` (radio group), \`bg\` (button group). If no type is defined, we default to a text input for ease.

---

**Help \`?\`**

Any help text to provide for the current field.

---

**Placeholder \`|\`**

A placeholder value to use in this field. Note that placeholders only work with text and textarea fields, and should not be used to convey meaning or help.

---

**Prefix \`<\`**

A prefix to apply to this field. Note that this only applies to text fields.

If the prefix begins with \`icon\`, this is assumed to be a prefix icon.

---

**Suffix \`>\`**

A suffix to apply to this field. Note that this only applies to text fields.

If the suffix begins with \`icon\`, this is assumed to be a prefix icon.

---

**ID \`#\`**

Used if you would like a defined ID for the field, rather than a randomly generated one.
`;

// TODO: Set a default form as an example
// TODO: Generate form on primary action
// TODO: Add validation for each line, ensuring that each has a NAME
// TODO: Store previous form in storage
// TODO: Add actions for quickly generating new fields (e.g. Add new textarea)
