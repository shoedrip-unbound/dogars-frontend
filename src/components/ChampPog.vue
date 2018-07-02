<template v-if="currentChamp">
  <a class="current" :href="currentChamp.current_battle">
    <img :src="img"/>
    <hr>
    <div>{{currentChamp.name}}</div>
    <div><b>{{currentChamp.trip}}</b></div>
  </a>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { settings } from "../settings";
import { avatarLink } from "@/utils";

@Component
export default class ChampPog extends Vue {
  currentChamp: any = {};
  img: string = "";
  mounted() {
    axios.get<any>("/api/champ").then(champ => {
      this.currentChamp = champ.data;
      this.img = avatarLink(champ.data.avatar);
    });
  }
}
</script>

<style scoped>
.current {
  top: 15px;
  left: 10px;
  width: 144px;
  height: 144px;
  padding: 0px;
  display: inline-block;
  position: absolute;
  overflow: hidden;
  font-size: small;
  text-align: center;
  border-radius: 9999px;
  box-shadow: 0 0 58px -21px, 0 4px #d0d0d0;
  background-color: white;
}
</style>
