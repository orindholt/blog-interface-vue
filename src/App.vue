<script>
import { computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
export default {
	components: { RouterLink, RouterView, Navbar },
	data() {
		return {
			data: JSON.parse(localStorage.getItem("access")) || null,
		};
	},
	methods: {
		setData: function (newData) {
			this.data = newData;
			if (newData !== null) {
				localStorage.setItem("access", JSON.stringify(newData));
			} else {
				localStorage.removeItem("access");
			}
		},
	},
	provide() {
		return {
			userData: computed(() => this.data),
			setUserData: this.setData,
		};
	},
};
</script>

<template>
	<header>
		<Navbar />
	</header>

	<main class="pt-10 px-10 min-h-screen flex flex-col">
		<RouterView />
	</main>
</template>

<style>
@import "@/assets/base.css";
</style>
