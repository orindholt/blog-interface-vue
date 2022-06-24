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
		checkToken: function () {
			if (!this.data) {
				clearInterval(checkInterval);
				return;
			}
			var checkInterval = setInterval(() => {
				if (this.data) {
					if (
						this.data?.token?.expiration <=
						parseInt(Date.now().toString().slice(0, 10))
					) {
						console.log("Token Expirered");
						this.setData(null);
					} else console.log("Token Valid");
				}
			}, 10000);
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
			this.checkToken();
		},
	},
	created() {
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
