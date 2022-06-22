<script>
  import axios from 'axios';
  import dateToRealtime from "../util/dateToRealtime";
  import { RouterLink } from 'vue-router';
  export default {
    props: {
      post: Object
    },
    data(){
      return {
        error: null,
        authorName: null,
        authorId: null,
        bookmarked: false
      }
    },
    methods: {
      rt: dateToRealtime,
      bookmark: function(){
        const config = {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("access"))?.accessToken
            }`,
          },
        };
        this.bookmarked = !this.bookmarked;
        if(this.bookmarked){
          axios.post(`http://localhost:2020/api/v1/saves/${this.post._id}`, {}, config).then(res => {
            console.log(res);
          }).catch(err => console.log(err));
        } else if(!this.bookmarked){
          axios.delete(`http://localhost:2020/api/v1/saves/${this.post._id}`, config).then(res => {
            console.log(res);
          }).catch(err => console.log(err));
        }
      }
    },
    created(){
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access"))?.accessToken
          }`,
        },
      };
      axios.get(`http://localhost:2020/api/v1/users/${this.post.author}`).then(res => {
        this.authorName = res.data.username;
        this.authorId = res.data._id;
      }).catch(err => {
        this.error = err.response.status;
      });;
      axios.get("http://localhost:2020/api/v1/profile", config).then(res => {
        if(res.data.saves.includes(this.post._id)) this.bookmarked = true;
      }).catch(err => {
        this.error = err.response.status;
      });
    }
  }
</script>

<template>
  <div class="animate-fadeIn">
    <div class="relative hover:scale-[1.02] transition-transform" v-if="this.authorName">
      <RouterLink :to="'/blog/' + this.post._id" class="w-full h-full rounded-sm shadow-sm overflow-hidden">
        <li class="text-center bg-white p-4 flex flex-col gap-1">
          <p class="uppercase">published <span class="font-medium text-salmon">{{rt(this.post.created)}}</span></p>
          <h2 class="text-3xl font-bold">{{this.post.title}}</h2>
          <p class="uppercase">By <span class="font-medium">{{this.authorName}}</span></p>
        </li>
      </RouterLink>
      <button class="text-2xl max-w-fit absolute right-3 bottom-1 hover:scale-105 active:scale-90 transition-transform" type="button" @click="bookmark" v-if="!error">
        <font-awesome-icon icon="fa-solid fa-bookmark" v-if="this.bookmarked" />
        <font-awesome-icon icon="fa-regular fa-bookmark" v-else />
      </button>
    </div>
  </div>
</template>