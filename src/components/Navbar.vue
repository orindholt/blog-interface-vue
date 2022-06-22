<script>
import axios from "axios";
import RouteLink from "./RouteLink.vue";
export default {
	components: { RouteLink },
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
					JSON.parse(localStorage.getItem("access"))?.accessToken
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
		class="text-lg fixed left-0 right-0 top-0 flex items-center text-black h-10 px-10 z-50 bg-gray bg-opacity-50 backdrop-blur-sm"
	>
		<ul class="flex w-full font-bold gap-10">
			<RouteLink anchor="/" classes="hover:text-darkGray">Home</RouteLink>
			<RouteLink anchor="/blog" classes="hover:text-darkGray">Blog</RouteLink>
			<RouteLink anchor="/bookmarks" classes="hover:text-darkGray"
				>Bookmarks</RouteLink
			>
			<div class="flex items-center ml-auto gap-10" v-if="!this.userData">
				<RouteLink anchor="/login" classes="hover:text-darkGray"
					>Login</RouteLink
				>
				<RouteLink
					anchor="/signup"
					classes="bg-salmon text-gray hover:scale-105 transition-transform rounded-md w-24"
					>Sign Up</RouteLink
				>
			</div>
			<div class="ml-auto" v-else>
				<RouteLink anchor="/profile" classes="hover:text-darkGray"
					>Profile</RouteLink
				>
			</div>
		</ul>
	</nav>
</template>
