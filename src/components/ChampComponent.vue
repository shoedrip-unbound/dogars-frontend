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

@Component
export default class ChampComponent extends Vue {
  @Prop() data!: any;

  img: string = "";
  elo: number = 1000;
  reload() {
    this.elo = 1000;
    let a = this.data.avatar;
    a = a.substr(a[0] == "#");
    this.img = `https://play.pokemonshowdown.com/sprites/trainers/${a}.png`;
    if (!this.data.elo) return;
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

  beforeUpdate() {
    this.reload();
  }

  mounted() {
    this.reload();
  }

  updated() {
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
  border: 1px solid grey;
  background-color: white;
  color: gray;
  box-shadow: 0 5px 0px 0px #cecece;
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
    border-bottom: 1px solid;
}
</style>
