<script>
import axios from "axios";
import Post from "../components/Post.vue";
export default {
	components: { Post },
	data() {
		return {
			error: null,
			name: null,
			data: null,
			profileData: null,
			nextReq: null,
		};
	},
	methods: {
		getMorePosts: function () {
			axios
				.get(this.nextReq)
				.then(res => {
					this.data.result = this.data.result.concat(res.data.result);
					this.nextReq = res.data.next;
					console.log(this.nextReq);
				})
				.catch(err => {
					console.log(err);
					this.error = err;
				});
		},
		getPosts: function () {
			axios
				.get(`${import.meta.env.VITE_API_URL}/api/v1/posts?offset=0&limit=4`)
				.then(res => {
					this.data = res.data;
					this.nextReq = res.data.next;
				})
				.catch(err => {
					console.log(err.response);
					this.error = err.response.status;
				});
		},
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
			.get(`${import.meta.env.VITE_API_URL}/api/v1/profile`, config)
			.then(res => (this.name = res.data.username))
			.catch(err => (this.error = err?.response?.status));
		this.getPosts();
	},
};
</script>

<template>
	<h1 class="text-4xl font-bold text-center">Dashboard</h1>
	<p class="text-center text-sm animate-fadeIn" v-if="name">
		Welcome back
		<span class="font-semibold animate-wiggle inline-block">{{ name }}</span>
	</p>
	<h2 class="text-3xl font-semibold text-center mt-10">Latest Posts</h2>
	<div v-if="data" class="flex flex-col pb-4">
		<ul class="grid grid-cols-2 gap-6 my-4">
			<Post
				v-for="(post, index) in data.result"
				:post="post"
				:key="index"
				:update-func="getPosts"
			/>
		</ul>
		<button
			v-if="nextReq"
			@click="getMorePosts"
			type="button"
			class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform opacity-0 animate-delayFadeIn"
		>
			View more
		</button>
	</div>
</template>
