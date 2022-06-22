<script setup>
import RouteLink from "./RouteLink.vue";
</script>

<template>
  <nav
    class="text-lg fixed left-0 right-0 top-0 flex items-center text-black h-10 px-10"
  >
    <ul class="flex w-full font-bold gap-10">
      <RouteLink anchor="/" classes="hover:text-darkGray">Home</RouteLink>
      <RouteLink anchor="/blog" classes="hover:text-darkGray">Blog</RouteLink>
      <RouteLink anchor="/bookmarks" classes="hover:text-darkGray">Bookmarks</RouteLink>
      <div class="flex items-center ml-auto gap-10">
        <RouteLink anchor="/login" classes="hover:text-darkGray">Login</RouteLink>
        <RouteLink anchor="/signup" classes="bg-salmon text-gray hover:scale-105 transition-transform rounded-md w-24">Sign Up</RouteLink>
      </div>
    </ul>
  </nav>
</template>