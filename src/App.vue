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
		checkToken: function (start) {
			if (!start) {
				clearInterval(checkInterval);
				return;
			}
			if (
				this.data &&
				this.data.token.expiration <=
					parseInt(Date.now().toString().slice(0, 10))
			)
				localStorage.removeItem("access");
			var checkInterval = setInterval(() => {
				console.log(this.data);
				if (this.data) {
					console.log(`${this.data.token.expiration} - ${Date.now()}`);
				}
			}, 5000);
		},
	},
	provide() {
		return {
			userData: computed(() => this.data),
			setUserData: this.setData,
		};
	},
	watch: {
		data(newData) {
			this.checkToken(newData ? true : false);
		},
	},
	created() {
		console.log(import.meta.env.VITE_API_URL);
		this.checkToken(true);
	},
};
</script>

<template>
	<header>
		<Navbar />
	</header>

	<main class="pt-10 pl-48 pr-8 min-h-screen flex flex-col">
		<RouterView />
	</main>
</template>

<style>
@import "@/assets/base.css";
</style>
