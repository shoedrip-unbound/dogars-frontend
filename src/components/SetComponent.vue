<template>
  <div v-if="data.species && data.species != ''" class="set">
    <h3>
        <router-link :to="`/set/${data.id}`">{{data.name || data.species}}</router-link>
    </h3>
    <div id="wrapper">
        <img :class="{setImage:true, custom: data.has_custom}" :src="imgUrl">
    </div>
    <div class="info">
        <label v-if="data.description">Description: </label>
        <p v-if="data.description" name="desc">{{data.description}}</p>
        <label>Date added: </label>
        <div>{{datestring}}</div>
        <label v-if="data.creator">Creator: </label>
        <div v-if="data.creator">{{data.creator}}</div>
        <label v-if="data.hash">Tripcode: </label>
        <div v-if="data.hash">{{data.hash}}</div>
        <label>Format: </label> <div>{{data.format}}</div>
    </div>
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
  text-align: center;
  width: 60%;
  margin: 0 auto 0 auto;
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

.info {
  display: grid;
  grid-template-areas: "h h";
  grid-auto-columns: fit-content(100%);
  grid-column-gap: 25px;
  grid-row-gap: 10px;
}

.custom {
  max-width: 100%;
}

.info :nth-child(2n) {
  justify-self: start;
  text-align: start;
}

.info :nth-child(2n + 1) {
  justify-self: end;
  text-align: end;
}

textarea {
  width: 100%;
  resize: none;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .set {
    width: 100%;
  }

  .set img {
    width: 200%;
  }
}
</style>
