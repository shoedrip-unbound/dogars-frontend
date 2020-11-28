<template>
  <div>
    <h1>Not found!</h1>
    <img src="@/assets/sleep.png" />
    <router-link to="/">Now click here to go back quietly...</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class Random extends Vue {
  created() {}
}
</script>

<style scope>
h1 {
  text-align: center;
}
a, img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}


</style>