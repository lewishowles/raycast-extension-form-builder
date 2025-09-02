# Form builder

Quickly create a form that uses `form-wrapper` and `form-field` from [`@lewishowles/components`](https://github.com/lewishowles/components) with text-based inputs and shortcuts.

For example, the following configuration:

```
Your name@your_name?Your name will only be used to identify your account
```

Will produce the following form

```html
<form-wrapper v-model="formData" @submit="createUser">
	<form-field v-bind="{ type: 'text', name: 'your_name' }">
		Your name

		<template #help>
			Your name will only be used to identify your account
		</template>
	</form-field>

	<template #submit-button-label>
		Create user
	</template>
</form-wrapper>
```
