<template>
    <img v-bind:src="link"/>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { settings } from "../settings";

@Component
export default class Banner extends Vue {
  link: string = "";

  created() {
    axios.get<string>("/api/ban").then(banlink => {
      if (banlink.status == 200)
        this.link = settings.domain + "/ban/" + banlink.data;
    });
  }
}
</script>

<style scoped>

img {
  width: 100%;
  display: inherit;
}
</style>
