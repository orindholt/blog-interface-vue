<script>
import axios from "axios";
import Post from "../components/Post.vue";
export default {
	components: { Post },
	inject: ["setUserData"],
	data() {
		return {
			error: null,
			data: null,
			nameEditable: false,
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
			.get("http://localhost:2020/api/v1/profile", config)
			.then(res => {
				console.log(res);
				this.data = res.data;
			})
			.catch(err => (this.error = err.response?.status));
	},
	methods: {
		editName: function () {
			this.nameEditable = !this.nameEditable;
		},
		logout: function () {
			this.setUserData(null);
			this.$router.push({ path: "/" });
		},
	},
};
</script>

<template>
	<h1 class="text-4xl font-bold text-center">Profile</h1>
	<div
		class="mx-auto my-10 animate-fadeIn bg-white w-full px-2 py-5 rounded-sm items-center flex flex-col"
	>
		<div class="max-w-sm w-full flex flex-col gap-4">
			<form v-if="this.data" class="flex flex-col animate-fadeIn">
				<div class="flex gap-2 items-center">
					<label for="username">Edit Username</label>
					<input
						type="text"
						placeholder="Username"
						id="username"
						name="username"
						:value="this.data.username"
						class="px-2 py-1 rounded-sm border-darkGray border-2 border-solid ml-auto"
						:disabled="!nameEditable"
						:class="{ 'cursor-not-allowed': !nameEditable }"
					/>
					<button type="button" @click="editName">
						<font-awesome-icon class="ml-1" icon="fa-solid fa-pen" />
					</button>
				</div>
			</form>
			<div class="flex gap-2 items-center">
				<label for="password"> Old Password </label>
				<input
					type="text"
					placeholder="Username"
					id="username"
					name="username"
					placehol
					class="px-2 py-1 rounded-sm border-darkGray border-2 border-solid ml-auto"
					:disabled="!nameEditable"
					:class="{ 'cursor-not-allowed': !nameEditable }"
				/>
				<button type="button" @click="editName">
					<font-awesome-icon class="ml-1" icon="fa-solid fa-pen" />
				</button>
			</div>
			<div class="flex gap-2 items-center">
				<label for="password"> New Password </label>
				<input
					type="text"
					placeholder="Username"
					id="username"
					name="username"
					placehol
					class="px-2 py-1 rounded-sm border-darkGray border-2 border-solid ml-auto"
					:disabled="!nameEditable"
					:class="{ 'cursor-not-allowed': !nameEditable }"
				/>
				<button type="button" @click="editName">
					<font-awesome-icon class="ml-1" icon="fa-solid fa-pen" />
				</button>
			</div>
			<button
				class="text-lg text-red-600 hover:text-red-700 transition-all hover:scale-105"
			>
				Delete Account
			</button>
			<button
				class="text-xl font-medium transition-transform hover:scale-105"
				@click="logout"
			>
				Log out
				<font-awesome-icon
					class="ml-1"
					icon="fa-solid fa-arrow-right-from-bracket"
				/>
			</button>
		</div>
	</div>
</template>
