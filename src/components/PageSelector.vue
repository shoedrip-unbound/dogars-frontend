<template>
  <div v-show="totalp > 1" class="pageselect">
    <div v-on:click="goToFirst()">
      <icon scale="2" name="angle-double-left" ></icon>
    </div>
    <div v-on:click="goToPrevious()">
      <icon scale="2" name="angle-left"></icon>
    </div>
    <p>{{current}} / {{totalp}}</p>
    <div v-on:click="goToNext()">
      <icon scale="2" name="angle-right"></icon>
    </div>
    <div v-on:click="goToLast()">
      <icon scale="2" name="angle-double-right"></icon>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Provide,
  Emit,
  Watch
} from "vue-property-decorator";

@Component
export default class PageSelector extends Vue {
  @Prop({ type: Number, required: false })
  current!: number;

  @Prop({ type: Number, required: true })
  total!: number;

  @Prop({ type: Number, required: true })
  spp!: number;

  totalp: number = 1;

  @Watch("total")
  updatePage() {
    this.totalp = ~~(this.total / 15) + +(this.total % 15 !== 0);
  }

  @Emit("first")
  goToFirst() {}

  @Emit("previous")
  goToPrevious() {}

  @Emit("next")
  goToNext() {}

  @Emit("last")
  goToLast() {}
}
</script>

<style scoped>
div.pageselect {
  margin: 0 auto 10px auto;
  display: table;
  text-align: center;
  padding: 10px 20px 10px 20px;
  -webkit-box-shadow: 0 0 30px -10px;
  box-shadow: 0 0 30px -10px;
  border: 1px solid black;
  border-radius: 7px;
  font-size: 1.4em;
}

.pageselect * {
    display: inline;
}

.pageselect p {
  margin: 0;
}

.pageselect svg {
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: text-bottom;
}

.pageselect svg:hover {
  cursor: pointer;
  background-color: rgb(201, 201, 201);
}
</style>
