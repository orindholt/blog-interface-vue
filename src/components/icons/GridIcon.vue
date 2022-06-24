<script>
export default {
	props: {
		size: {
			type: String,
			default: "27",
		},
	},
	name: "grid-icon",
};
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="size"
		:height="size"
		viewBox="0 0 27 27"
		fill="none"
	>
		<rect x="2" y="2" width="10" height="10" rx="2" fill="currentColor" />
		<rect x="15" y="2" width="10" height="10" rx="2" fill="currentColor" />
		<rect x="15" y="15" width="10" height="10" rx="2" fill="currentColor" />
		<rect x="2" y="15" width="10" height="10" rx="2" fill="currentColor" />
	</svg>
</template>
