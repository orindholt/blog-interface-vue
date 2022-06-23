<script>
import axios from "axios";
import Post from "../components/Post.vue";
import { RouterLink } from "vue-router";
export default {
	components: { Post, RouterLink },
	data() {
		return {
			error: null,
			data: [],
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
		axios
			.get("http://localhost:2020/api/v1/saves", config)
			.then(res => {
				this.loggedIn = true;
				res.data.forEach(id => {
					axios.get(`http://localhost:2020/api/v1/posts/${id}`).then(res => {
						this.data.push(res.data);
						console.log(this.data);
					});
				});
			})
			.catch(err => {
				console.log(err.response);
				this.error = err.response.status;
			});
	},
};
</script>

<template>
	<h1 class="text-4xl font-bold text-center">Bookmarks</h1>
	<div v-if="data.length">
		<ul class="grid grid-cols-1 gap-6 my-4">
			<Post v-for="(post, index) in data" :post="post" :key="index" />
		</ul>
		<button
			v-if="data.next"
			type="button"
			class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform"
		>
			View more
		</button>
	</div>
	<div
		class="text-center my-auto pb-20 flex flex-col gap-2 animate-delayFadeIn opacity-0"
		v-else-if="!data.length && loggedIn"
	>
		<h2 class="text-2xl">You don't seem to have bookmarks yet!</h2>
		<RouterLink
			class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform"
			to="/blog"
			>Blog</RouterLink
		>
	</div>
	<div
		class="text-center my-auto pb-20 flex flex-col gap-2 animate-delayFadeIn opacity-0"
		v-else
	>
		<h2 class="text-2xl">You need to be logged in to bookmark posts!</h2>
		<RouterLink
			class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform"
			to="/login"
			>Login</RouterLink
		>
	</div>
</template>
