<script>
import { RouterLink } from "vue-router";
export default {
	components: { RouterLink },
	props: {
		anchor: {
			type: String,
			required: true,
		},
	},
};
</script>

<template>
	<li>
		<RouterLink
			:to="anchor"
			class="h-full w-full flex items-center justify-center font-semibold gap-2"
		>
			<slot></slot>
		</RouterLink>
	</li>
</template>
