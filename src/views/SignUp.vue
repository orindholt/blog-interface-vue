<script>
  import axios from "axios";
  import router from "../router";
  import { RouterLink } from 'vue-router';
  const baseApi = "http://localhost:2020";
  export default {
    data(){
      return {
        data: null,
        error: null,
        username: null,
        password: null,
        role: "customer",
        rolesList: [
          {
            name: "User",
            value: "customer"
          },
          {
            name: "Author",
            value: "author"
          },
        ]
      }
    },
    methods: {
      createUser: function(){
        const reqBody = {
          username: this.username,
          password: this.password,
          role: this.role
        }
        axios.post(`${baseApi}/api/v1/users`, reqBody).then(() => {
          console.log(reqBody);
          axios.post(`${baseApi}/auth/token`, reqBody).then(({ data: { token } }) => {
            localStorage.setItem("access", JSON.stringify({
              accessToken: token,
              username: this.username
            }));
            router.push("/");
          }).catch(this.error = "Server Error! Please try again later");
        }).catch(err => {
          this.error = 
            err.response.status === 400 ? "You are missing a field!" : 
            err.response.status === 409 ? "This user already exists!" : 
            "Server Error! Please try again later"
        })
      }
    }
  }
</script>

<template>
  <div class="my-auto pb-20 flex flex-col items-center">
    <h1 class="text-4xl font-bold mb-4">Sign Up</h1>
    <form @submit.prevent="createUser" class="flex flex-col gap-3 items-center max-w-xs w-full">
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <input type="text" v-model="username" id="username" placeholder="Username" class="border border-gray px-2 py-1 rounded-sm w-full">
      <input type="password" v-model="password" id="password" placeholder="Password" class="border border-gray px-2 py-1 rounded-sm w-full" />
      <select name="role" id="role" v-model="role" class="border border-gray rounded-sm w-full p-0.5">
        <option v-for="(val, index) in rolesList" :key="index" :value="val.value">{{val.name}}</option>
      </select>
      <button type="submit" class="bg-salmon text-white rounded-sm max-w-fit px-4 shadow-sm hover:scale-110 transition-transform text-lg font-semibold">Sign up</button>
    </form>
    <RouterLink to="/login" class="text-darkGray underline mt-2">Already have an account? Log in here</RouterLink>
  </div>
</template>