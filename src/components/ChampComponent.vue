<template>
  <div class="champ">
    <img :src="img"/>
    <hr>
    <div class="info">
      <span>{{data.name}}</span><br>
      <span style="font-weight: bold">{{data.trip}}</span>
    </div>
    <hr>
    <div class="stats">
      <span style="color: green">{{`Wins: ${data.wins}`}}</span><br>
      <span style="color: red">{{`Losses: ${data.loses}`}}</span>
    </div>
    <hr>
    <span>{{elo}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { Champ } from "@/Models/Champ";
import { avatarLink } from '@/utils';

@Component
export default class ChampComponent extends Vue {
  @Prop() data!: any;

  img: string = "";
  elo: number = 1000;
  reload() {
    this.img = avatarLink(this.data.avatar);
    if (!this.data.elo) return;
    this.elo = 1000;
    if (this.data.elo[0] != "]") {
      this.elo = ~~this.data.elo;
      return;
    }
    let b = this.data.elo.substr(1);
    let ranks: any[] = JSON.parse(b);
    let ou = ranks.filter(r => r.formatid == "gen7ou");
    if (!ou) return;
    let rou = ou[0];
    this.elo = ~~rou.elo;
  }

  mounted() {
    this.reload();
  }

  @Watch("data")
  obsData() {
    this.reload();
  }
}
</script>

<style scoped>
.champ {
  border: 1px solid var(--text);
  background-color: var(--content);
  color: var(--text);
  box-shadow: 0 5px 0px 0px var(--text);
  border-radius: 7px;
  padding: 1% 0 1% 0;
  margin: 1%;
  box-sizing: border-box;
  width: 23%;
  text-align: center;
}

.page {
  display: inline-flex;
  flex-wrap: wrap;
}

.champ hr {
  border: none;
  border-bottom: 1px solid var(--text);
}

@media screen and (max-width: 425px) {
  .champ {
    width: 48%;
  }
}
</style>
