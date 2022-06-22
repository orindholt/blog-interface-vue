<script>
import axios from "axios";
import Post from "../../components/Post.vue";
export default {
	components: { Post },
	data() {
		return {
			error: null,
			data: null,
			role: null,
		};
	},

	created() {
		const config = {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("access")).accessToken
				}`,
			},
		};
		axios
			.get("http://localhost:2020/api/v1/posts?limit=10")
			.then(res => {
				this.data = res.data;
			})
			.catch(err => {
				console.log(err.response);
				this.error = err.response.status;
			});
		console.log(config.headers.Authorization);
		axios
			.get("http://localhost:2020/api/v1/profile", config)
			.then(res => {
				console.log(res.data.role);
				this.role = res.data.role;
			})
			.catch(err => {
				console.log(err);
				this.error = err.response.status;
			});
	},
	methods: {
		createPost: function () {},
	},
};
</script>

<template>
	<div>
		<h1 class="text-4xl font-bold text-center">Blog</h1>
		<div v-if="data && role" class="flex gap-10 my-4 animate-fadeIn">
			<div class="flex-[2]">
				<ul class="grid grid-cols-1 gap-6">
					<Post
						v-for="(post, index) in data.result"
						:key="index"
						:post="post"
					/>
				</ul>
				<button
					v-if="data.next"
					type="button"
					class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform"
				>
					View more
				</button>
			</div>
			<form
				class="flex flex-col gap-2 flex-1 min-h-[20rem] animate-fadeIn"
				v-if="!error && role !== 'customer'"
			>
				<div class="flex gap-2">
					<div class="flex flex-col gap-0.5 flex-1">
						<label for="title" class="text-xl">Title</label>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="Post Title"
							class="px-2 py-1 rounded-sm"
							required
						/>
					</div>
				</div>
				<div class="flex flex-col gap-0.5 h-full">
					<label for="content" class="text-xl">Content</label>
					<textarea
						name="content"
						id="content"
						placeholder="Post Content"
						class="px-2 py-1 rounded-sm resize-none h-full"
						required
					/>
				</div>
				<button
					type="submit"
					class="bg-black text-white rounded-sm w-full py-1 text-xl hover:scale-[1.01] transition-transform"
				>
					Post
				</button>
			</form>
		</div>
	</div>
</template>
