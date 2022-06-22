<script>
import axios from "axios";
import dateToRealtime from "../util/dateToRealtime";
import { RouterLink } from "vue-router";
export default {
	components: { RouterLink },
	props: {
		post: Object,
		updateFunc: Function,
	},
	data() {
		return {
			error: null,
			authorName: null,
			authorId: null,
			bookmarked: false,
			loggedIn: false,
			deleteable: false,
		};
	},
	methods: {
		rt: dateToRealtime,
		bookmarkPost: function () {
			const config = {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("access"))?.accessToken
					}`,
				},
			};
			this.bookmarked = !this.bookmarked;
			if (this.bookmarked) {
				axios
					.post(
						`http://localhost:2020/api/v1/saves/${this.post._id}`,
						{},
						config
					)
					.then(res => {
						console.log(res);
					})
					.catch(err => console.log(err));
			} else if (!this.bookmarked) {
				axios
					.delete(`http://localhost:2020/api/v1/saves/${this.post._id}`, config)
					.then(res => {
						console.log(res);
					})
					.catch(err => console.log(err));
			}
		},
		deletePost: function () {
			const config = {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("access"))?.accessToken
					}`,
				},
			};
			axios
				.delete(`http://localhost:2020/api/v1/posts/${this.post._id}`, config)
				.then(res => {
					console.log(res);
					this.updateFunc();
				})
				.catch(err => console.log(err));
		},
	},
	created() {
		const config = {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("access"))?.accessToken
				}`,
			},
		};
		axios
			.get(`http://localhost:2020/api/v1/users/${this.post.author}`)
			.then(res => {
				this.authorName = res.data.username;
				this.authorId = res.data._id;
			})
			.catch(err => {
				this.error = err.response.status;
			});
		if (localStorage.getItem("access")) {
			axios
				.get("http://localhost:2020/api/v1/profile", config)
				.then(res => {
					this.loggedIn = true;
					if (this.authorId === res.data._id || res.data.role === "admin")
						this.deleteable = true;
					if (res.data.saves.includes(this.post._id)) this.bookmarked = true;
				})
				.catch(err => {
					this.error = err.response.status;
				});
		}
	},
};
</script>

<template>
	<div class="animate-fadeIn">
		<div
			class="relative hover:scale-[1.02] transition-transform"
			v-if="this.authorName"
		>
			<RouterLink
				:to="'/blog/' + this.post._id"
				class="w-full h-full rounded-sm shadow-sm overflow-hidden"
			>
				<li class="text-center bg-white p-4 flex flex-col gap-1">
					<p class="uppercase">
						published
						<span class="font-medium text-salmon">{{
							rt(this.post.created)
						}}</span>
					</p>
					<h2 class="text-3xl font-bold">{{ this.post.title }}</h2>
					<p class="uppercase">
						By <span class="font-medium">{{ this.authorName }}</span>
					</p>
				</li>
			</RouterLink>
			<button
				class="text-2xl max-w-fit absolute right-3 bottom-1 hover:scale-105 active:scale-90 transition-transform"
				type="button"
				@click="bookmarkPost"
				v-if="!error && loggedIn"
			>
				<font-awesome-icon icon="fa-solid fa-bookmark" v-if="this.bookmarked" />
				<font-awesome-icon icon="fa-regular fa-bookmark" v-else />
			</button>
			<button
				class="text-2xl max-w-fit absolute right-3 top-2 hover:scale-105 active:scale-90 transition-transform text-red-700"
				type="button"
				@click="deletePost"
				v-if="!error && loggedIn && deleteable"
			>
				<font-awesome-icon icon="fa-solid fa-trash-can" />
			</button>
		</div>
	</div>
</template>
