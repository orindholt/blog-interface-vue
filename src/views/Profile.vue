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
					JSON.parse(localStorage.getItem("access"))?.accessToken
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
	<div class="mx-auto my-10 flex flex-col animate-fadeIn">
		<form v-if="this.data" class="flex flex-col animate-fadeIn">
			<div class="flex gap-2 items-center">
				<label for="username">Username</label>
				<input
					type="text"
					placeholder="Username"
					id="username"
					name="username"
					:value="this.data.username"
					class="px-2 py-1 rounded-sm border-darkGray border-2 border-solid"
					:disabled="!nameEditable"
				/>
				<button type="button" @click="editName">
					<font-awesome-icon icon="fa-solid fa-pen" />
				</button>
			</div>
		</form>
		<button class="my-10 text-lg text-red-600">Edit password</button>
		<button class="text-xl font-medium" @click="logout">
			Log out <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
		</button>
	</div>
</template>
