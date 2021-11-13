<template>
  <div class="home">
    <h2>Welcome to the Meme Database, it's fucking over and I cope</h2>
    Simply, this is a place to submit and view meme sets. If you don't know what this is, lurk moar. That's it. Now go find some memes.
    <h2>Meme of the day</h2>
    <SetComponent v-bind:data="meme"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SetComponent from "@/components/SetComponent.vue"; // @ is an alias to /src
import axios from "axios";
import { Sets } from "@/Models/Sets";

@Component({
  components: {
    SetComponent
  }
})
export default class Home extends Vue {
  meme: Sets = {} as Sets;
  created() {
    axios.get<Sets>("/api/day").then(ran => {
      this.meme = ran.data;
    });
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
</style>
