<script>
import { RouterLink } from 'vue-router';
export default {
  props: {
    anchor: {
      type: String,
      required: true
    },
    classes: ""
  }
}
</script>

<template>
  <li :class="this.classes">
    <RouterLink :to="anchor" class="h-full w-full flex items-center justify-center font-semibold">
      <slot></slot>
    </RouterLink>
  </li>
</template>