<script>
import axios from "axios";
import dateToRealtime from "../../util/dateToRealtime";
import { RouterLink } from "vue-router";
const baseApi = "${import.meta.env.VITE_API_URL}";
export default {
	components: { RouterLink },
	data() {
		return {
			data: null,
			error: null,
			authorName: null,
			bookmarked: false,
			loggedIn: false,
		};
	},
	methods: {
		rt: dateToRealtime,
		bookmark: function () {
			const config = {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("access"))?.token.bearer
					}`,
				},
			};
			this.bookmarked = !this.bookmarked;
			if (this.bookmarked) {
				axios
					.post(
						`${import.meta.env.VITE_API_URL}/api/v1/saves/${this.data._id}`,
						{},
						config
					)
					.then(res => {
						console.log(res);
					})
					.catch(err => console.log(err));
			} else if (!this.bookmarked) {
				axios
					.delete(
						`${import.meta.env.VITE_API_URL}/api/v1/saves/${this.data._id}`,
						config
					)
					.then(res => {
						console.log(res);
					})
					.catch(err => console.log(err));
			}
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
			.get(`${baseApi}/api/v1/posts/${this.$route.params.id}`)
			.then(res => {
				this.data = res.data;
				console.log(res.data);
				axios
					.get(
						`${import.meta.env.VITE_API_URL}/api/v1/users/${res.data.author}`
					)
					.then(res => (this.authorName = res.data.username));
			})
			.catch(err => {
				this.error = err.response.status;
			});
		if (localStorage.getItem("access")) {
			axios
				.get(`${import.meta.env.VITE_API_URL}/api/v1/profile`, config)
				.then(res => {
					this.loggedIn = true;
					if (res.data.saves.includes(this.data._id)) this.bookmarked = true;
				})
				.catch(err => {
					this.error = err.response.status;
				});
		}
	},
};
</script>

<template>
	<div v-if="this.data" class="animate-fadeIn bg-white p-4 shadow-sm">
		<h3 class="text-blue font-semibold uppercase text-center">
			{{ rt(this.data.created.slice(0, 10)) }}
		</h3>
		<h1 class="text-4xl font-bold text-center">{{ this.data.title }}</h1>
		<h3 class="text-center uppercase font-light text-lg">
			By
			<RouterLink
				:to="'/users/' + this.data.author"
				class="font-medium hover:text-darkGray hover:underline"
				>{{ authorName }}</RouterLink
			>
		</h3>
		<button
			class="text-2xl max-w-fit absolute right-4 top-3 hover:scale-105 active:scale-90 transition-transform"
			type="button"
			@click="bookmark"
			v-if="!error && loggedIn"
		>
			<font-awesome-icon icon="fa-solid fa-bookmark" v-if="this.bookmarked" />
			<font-awesome-icon icon="fa-regular fa-bookmark" v-else />
		</button>
		<hr class="opacity-10 my-4" />
		<p>{{ this.data.content }}</p>
		<hr class="opacity-10 my-4" />
	</div>
</template>
