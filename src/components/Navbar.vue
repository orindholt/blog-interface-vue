<script>
import axios from "axios";
import RouteLink from "./RouteLink.vue";
import GridIconVue from "./icons/GridIcon.vue";
export default {
	components: { RouteLink, GridIconVue },
	inject: ["userData"],
	data() {
		return {
			data: null,
			loggedIn: false,
		};
	},
	created() {
		const config = {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("access"))?.token.bearer
				}`,
			},
		};
		if (this.userData) {
			axios
				.get("http://localhost:2020/api/v1/profile", config)
				.then(() => {
					this.loggedIn = true;
				})
				.catch(err => console.log(err));
		}
	},
};
</script>

<template>
	<nav
		class="text-lg fixed left-0 top-0 bottom-0 text-white w-40 py-10 px-3 z-50 bg-blue"
	>
		<ul class="flex flex-col items-start h-full w-full font-bold gap-7">
			<RouteLink anchor="/" class="hover:opacity-100 opacity-50"
				><GridIconVue size="18" /> Dashboard</RouteLink
			>
			<RouteLink anchor="/blog" class="hover:opacity-100 opacity-50"
				><font-awesome-icon icon="fa-solid fa-rss" /> Blog</RouteLink
			>
			<RouteLink anchor="/bookmarks" class="hover:opacity-100 opacity-50"
				><font-awesome-icon icon="fa-solid fa-book-bookmark" />
				Bookmarks</RouteLink
			>
			<div
				class="flex flex-col items-center gap-7 w-full mt-auto"
				v-if="!this.userData"
			>
				<RouteLink anchor="/login" class="hover:opacity-100 opacity-50"
					>Login</RouteLink
				>
				<RouteLink
					anchor="/signup"
					class="bg-orange hover:scale-105 transition-transform rounded-md py-1 w-full"
					>Sign Up</RouteLink
				>
			</div>
			<div v-else>
				<RouteLink anchor="/profile" class="hover:opacity-100 opacity-50"
					><font-awesome-icon icon="fa-solid fa-user" /> Profile</RouteLink
				>
			</div>
		</ul>
	</nav>
</template>
