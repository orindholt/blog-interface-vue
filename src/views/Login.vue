<script>
import axios from "axios";
import { RouterLink } from "vue-router";
const baseApi = "http://localhost:2020";
export default {
	components: { RouterLink },
	inject: ["setUserData"],
	data() {
		return {
			data: null,
			error: null,
			username: null,
			password: null,
		};
	},
	methods: {
		createUser: function () {
			const reqBody = {
				username: this.username,
				password: this.password,
			};
			axios
				.post(`${baseApi}/auth/token`, reqBody)
				.then(({ data: { token, expiration } }) => {
					const userObject = {
						token: {
							bearer: token,
							expiration,
						},
						username: this.username,
					};
					this.setUserData(userObject);
					this.$router.push({ path: "/" });
				})
				.catch(err => {
					console.log(err);
					this.error = err.response.status;
				});
		},
	},
};
</script>

<template>
	<div class="my-auto pb-20 flex flex-col items-center">
		<h1 class="text-4xl font-bold mb-4">Login</h1>
		<form
			@submit.prevent="createUser"
			class="flex flex-col gap-3 items-center max-w-xs w-full"
		>
			<p v-if="error" class="text-red-500 text-center">
				{{
					error === 401
						? "Your username or password is wrong!"
						: error === 400
						? "You are missing a username or password!"
						: "Server Error! Please try again later"
				}}
			</p>
			<input
				type="text"
				v-model="username"
				id="username"
				placeholder="Username"
				class="border border-gray px-2 py-1 rounded-sm w-full"
				:class="{ '!border-red-500': error === 400 || error === 401 }"
			/>
			<input
				type="password"
				v-model="password"
				id="password"
				placeholder="Password"
				class="border border-gray px-2 py-1 rounded-sm w-full"
				:class="{ 'border-red-500': error === 400 || error === 401 }"
			/>
			<button
				type="submit"
				class="bg-blue text-white rounded-sm max-w-fit px-4 shadow-sm hover:scale-110 transition-all text-lg font-semibold"
			>
				Log in
			</button>
		</form>
		<RouterLink to="/signup" class="text-darkGray underline mt-2"
			>Don't have an account? Sign up here</RouterLink
		>
	</div>
</template>
