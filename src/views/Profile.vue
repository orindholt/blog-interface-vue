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
			username: null,
			password: null,
			role: null,
			passEditable: false,
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
			.get(`${import.meta.env.VITE_API_URL}/api/v1/profile`, config)
			.then(res => {
				console.log(res);
				this.data = res.data;
				this.username = res.data.username;
			})
			.catch(err => (this.error = err.response?.status));
	},
	methods: {
		editUsername: function () {
			this.nameEditable = !this.nameEditable;
		},
		editPassword: function () {
			this.passEditable = !this.passEditable;
		},
		logout: function () {
			this.setUserData(null);
			this.$router.push({ path: "/" });
		},
		deleteProfile: function () {
			const config = {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("access"))?.token.bearer
					}`,
				},
			};
			axios
				.delete(
					`${import.meta.env.VITE_API_URL}/api/v1/users/${this.data._id}`,
					config
				)
				.then(() => {
					this.setUserData(null);
					this.$router.push({ path: "/" });
					// FUTURE FEATURE: Should delete all posts connected to author
				})
				.catch(err => {
					console.log(err.response.status);
					this.error = err?.response?.status;
				});
		},
		modifyProfile: function () {
			const config = {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("access"))?.token.bearer
					}`,
				},
			};
			const reqBody = { username: this.username };
			if (this.password) reqBody.password = this.password;
			axios
				.patch(
					`${import.meta.env.VITE_API_URL}/api/v1/users/${this.data._id}`,
					reqBody,
					config
				)
				.then(() => {
					this.error = null;
					this.nameEditable = false;
					this.passEditable = false;
				})
				.catch(err => {
					console.log(err.response.status);
					this.error = err?.response?.status;
				});
		},
	},
};
</script>

<template>
	<h1 class="text-4xl font-bold text-center">Profile</h1>
	<div
		class="mx-auto my-10 animate-fadeIn bg-white w-full px-2 py-5 rounded-sm items-center flex flex-col"
	>
		<div class="max-w-md w-full flex flex-col gap-4">
			<form
				v-if="this.data"
				class="flex flex-col gap-4 animate-fadeIn"
				@submit.prevent="modifyProfile"
			>
				<h2 class="text-center font-bold text-xl">Edit Profile</h2>
				<p v-if="error" class="text-red text-center mb-1">
					{{
						error === 409
							? "This username is already taken!"
							: "Server Error! Try again later"
					}}
				</p>
				<div class="flex gap-2 items-center justify-center">
					<label for="username" class="w-32 text-right">Edit Username:</label>
					<input
						type="text"
						placeholder="New Username"
						id="username"
						name="username"
						v-model="this.username"
						class="px-2 py-1 rounded-sm border-darkGray border-2 border-solid"
						:disabled="!nameEditable"
						:class="{
							'cursor-not-allowed': !nameEditable,
							'bg-gray': !nameEditable,
						}"
					/>
					<button type="button" class="ml-1 w-5" @click="editUsername">
						<font-awesome-icon v-if="!nameEditable" icon="fa-solid fa-pen" />
						<font-awesome-icon v-else icon="fa-solid fa-x" />
					</button>
				</div>

				<div class="flex gap-2 items-center justify-center">
					<label for="password" class="w-32 text-right">Edit Password:</label>
					<input
						type="password"
						placeholder="New Password"
						id="password"
						name="password"
						v-model="this.password"
						class="px-2 py-1 rounded-sm border-darkGray border-2 border-solid"
						:disabled="!passEditable"
						:class="{
							'cursor-not-allowed': !passEditable,
							'bg-gray': !passEditable,
						}"
					/>
					<button type="button" class="ml-1 w-5" @click="editPassword">
						<font-awesome-icon v-if="!passEditable" icon="fa-solid fa-pen" />
						<font-awesome-icon v-else icon="fa-solid fa-x" />
					</button>
				</div>
				<button
					:type="
						'submit'
							? this.username !== this.data.username || this.password
							: 'button'
					"
					class="font-medium transition-all opacity-70 max-w-fit mx-auto"
					:class="{
						'cursor-not-allowed':
							this.username === this.data.username && !this.password,
						'hover:scale-105 hover:opacity-100':
							this.username !== this.data.username || this.password,
					}"
				>
					Apply Changes
				</button>
			</form>
			<hr class="opacity-20" />
			<button
				class="text-lg font-medium text-red opacity-70 hover:opacity-100 transition-all hover:scale-105"
				type="button"
				@click="deleteProfile"
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
