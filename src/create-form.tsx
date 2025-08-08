import { Action, ActionPanel, Clipboard, Form, Toast, showToast } from "@raycast/api";
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
	 * @param  {mixed}  variable
	 *     The variable to test.
	 */
	//function isNonEmptyString(variable: unknown): variable is string {
	//	return typeof variable === "string" && variable !== "";
	//}

	return (
		<Form
			actions={
				<ActionPanel>
					<Action.SubmitForm title="Generate Form" onSubmit={handleSubmit} />
				</ActionPanel>
			}
		>
			<Form.Description text="Enter your configuration to generate a form." />
			<Form.TextArea title="Configuration" {...itemProps.configuration} />
		</Form>
	);
}
