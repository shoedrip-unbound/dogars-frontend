<template>
  <div v-if="data.species && data.species != ''" class="set">
    <h3>
      <router-link :to="`/set/${data.id}`">{{data.name || data.species}}</router-link>
    </h3>
    <div class="wrapper">
      <img :class="{setImage:true, custom: data.has_custom}" :src="imgUrl">
    </div>
    <table>
      <tbody>
        <tr v-if="data.description"><th scope="row" align="right">Description</th><td>{{data.description}}</td></tr>
        <tr><th scope="row" align="right">Date added</th><td>{{datestring}}</td></tr>
        <tr v-if="data.creator"><th scope="row" align="right">Creator</th><td>{{data.creator}}</td></tr>
        <tr v-if="data.hash"><th scope="row" align="right">Tripcode</th><td>{{data.hash}}</td></tr>
        <tr><th scope="row" align="right">Format</th><td>{{data.format}}</td></tr>
      </tbody>
    </table>
    <textarea ref="ta" v-on:focus="focused($event)" v-model="description"></textarea>
    <div v-show="$route.path.match(/\/set/) && data.hash">
      Updating is disabled at the moment.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { Sets } from "@/Models/Sets";
import { getPokemonImage, setToString } from "../utils";

@Component
export default class SetComponent extends Vue {
  @Prop({ required: true })
  data!: any;

  datestring: string = "";
  imgUrl: string = "";
  description = "";

  focused(ev: FocusEvent) {
    let ta = ev.srcElement! as HTMLTextAreaElement;
    ta.select();
  }

  reload() {
    let k = new Date(+this.data.date_added!);
    this.datestring = k.toDateString();
    this.imgUrl = getPokemonImage(this.data);
    this.description = setToString(this.data);
    let tab = this.$refs["ta"];
    if (!tab) return;
    let ta = tab as HTMLTextAreaElement;
    ta.rows = this.description.split("\n").length;
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
.set {
  width: 60%;
  margin: 0 auto 0 auto;
}

.set > h3,
.set > .wrapper {
  text-align: center;
}

p {
  margin: 0;
}

#wrapper {
  display: inline-block;
}

img {
  image-rendering: pixelated;
}

.custom {
  max-width: 100%;
}

textarea {
  width: 100%;
  resize: none;
}

table {
  width: 100%;
  border: 1px solid;
  margin-bottom: 5px;
  padding: 0;
  border-spacing: 0;
  border-collapse: collapse;
  box-sizing: border-box;
}

tr :nth-child(2n + 1) {
  background-color: var(--oof);
  border-right: 1px solid;
  white-space: nowrap;
  width: 1%;
  padding: 10px;
}

td {
  padding: 10px;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .set > h3 {
    font-size: 2em;
  }

  .set {
    width: 100%;
  }

  .set img {
    min-height: 25vh;
    image-rendering: initial;
  }
}
</style>
