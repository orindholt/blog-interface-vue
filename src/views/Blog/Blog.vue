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
			nextReq: null,
			authorId: null,
			postTitle: null,
			postContent: null,
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
				.get("http://localhost:2020/api/v1/posts?offset=0&limit=10")
				.then(res => {
					this.data = res.data;
					console.log(res.data);
					this.nextReq = res.data.next;
				})
				.catch(err => {
					console.log(err.response);
					this.error = err.response.status;
				});
		},
		createPost: function () {
			const config = {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("access"))?.accessToken
					}`,
				},
			};
			const reqBody = {
				title: this.postTitle,
				content: this.postContent,
				author: this.authorId,
			};
			axios
				.post("http://localhost:2020/api/v1/posts", reqBody, config)
				.then(() => this.getPosts())
				.catch(err => console.log(err));
		},
	},
	created() {
		this.getPosts();
		const config = {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("access"))?.accessToken
				}`,
			},
		};
		if (localStorage.getItem("access")) {
			axios
				.get("http://localhost:2020/api/v1/profile", config)
				.then(res => {
					this.authorId = res.data._id;
					this.role = res.data.role;
				})
				.catch(err => {
					console.log(err);
					this.error = err.response.status;
				});
		}
	},
};
</script>

<template>
	<div>
		<h1 class="text-4xl font-bold text-center">Blog</h1>
		<div v-if="this.data" class="flex gap-10 my-4 animate-fadeIn">
			<div class="flex-[2] flex flex-col">
				<ul
					class="grid grid-cols-1 gap-6 mb-4"
					:class="{
						'!grid-cols-2':
							!this.role === 'author' || !this.role === 'admin' || !this.role,
					}"
				>
					<Post
						v-for="(post, index) in this.data.result"
						:update-func="this.getPosts"
						:key="index"
						:post="post"
					/>
				</ul>
				<button
					v-if="nextReq"
					@click="getMorePosts"
					type="button"
					class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform animate-fadeIn"
				>
					View more
				</button>
			</div>
			<form
				class="flex flex-col gap-2 flex-1 h-[26.25rem] animate-fadeIn"
				@submit.prevent="createPost"
				v-if="
					!this.error &&
					this.role &&
					(this.role === 'author' || this.role === 'admin')
				"
			>
				<h2 class="text-2xl font-semibold text-center">
					Write a blog post here
				</h2>
				<div class="flex gap-2">
					<div class="flex flex-col gap-0.5 flex-1">
						<label for="title" class="text-xl">Title</label>
						<input
							v-model="postTitle"
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
						v-model="postContent"
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
