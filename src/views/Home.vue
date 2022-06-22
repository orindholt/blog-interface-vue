<script>
  import axios from 'axios';
  import Post from '../components/Post.vue';
  export default {
    data() {
      return {
        error: null,
        name: null,
        data: null
      };
    },
    created() {
        if(localStorage.getItem("access")) this.name = JSON.parse(localStorage.getItem("access")).username;
        axios.get("http://localhost:2020/api/v1/posts?limit=4").then(res => {
          this.data = res.data;
        }).catch(err => {
          console.log(err.response);
          this.error = err.response.status;
        });
    },
    components: { Post }
}
</script>

<template>
  <h1 class="text-4xl font-bold text-center">Home</h1>
  <p class="text-center text-sm animate-fadeIn" v-if="name">Welcome back <span class="font-semibold animate-wiggle inline-block">{{name}}</span></p>
  <h2 class="text-3xl font-semibold text-center mt-10">Latest Posts</h2>
  <div v-if="data">
    <ul class="grid grid-cols-2 gap-6 my-4">
      <Post v-for="(post, index) in data.result" :post="post" :key="index" />
    </ul>
    <button v-if="data.next" type="button" class="max-w-fit px-4 py-1 bg-black text-white rounded-sm font-medium mx-auto text-lg hover:scale-105 transition-transform">View more</button>
  </div>
</template>
