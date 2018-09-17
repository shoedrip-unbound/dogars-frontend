<template>
  <img :src="img" v-if="img && img != '' && img != 'None'">
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { settings } from "../settings";

@Component
export default class Waifu extends Vue {
  img: string = "";
}
</script>

<style scoped>
img {
    position: fixed;
    left: 10px;
    bottom: 0;
    z-index: -100;
}
</style>
