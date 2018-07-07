<template>
    <div id="search">
        <h2>Advanced Search</h2>
        <form class="search" v-on:submit.prevent="search()">
            <div>
              <input placeholder="Name" v-model="name"/> 
              <div style="display: contents;"><span>(</span><input placeholder="Species" v-model="species"/><span>)@</span></div>
              <input placeholder="Item" v-model="item"/>
            </div>
            <label>Ability: </label><input v-model="ability"/>
            <label>- </label><input v-model="move_1"/>
            <label>- </label><input v-model="move_2"/>
            <label>- </label><input v-model="move_3"/>
            <label>- </label><input v-model="move_4"/>
            <label>Creator: </label><input v-model="creator"/>
            <label>Tripcode: </label><input v-model="hash"/>
            <input type="submit">
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Search extends Vue {
  name: string = "";
  species: string = "";
  item: string = "";
  ability: string = "";
  // eslint-disable-next-line
  move_1: string = "";
  // eslint-disable-next-line
  move_2: string = "";
  // eslint-disable-next-line
  move_3: string = "";
  // eslint-disable-next-line
  move_4: string = "";
  creator: string = "";
  hash: string = "";
  [key: string]: any;

  search() {
    let q = JSON.parse(JSON.stringify(this.$data));
    this.$router.push({ path: "/results", query: q });
  }

  created() {
    let q = this.$route.query.q;
    if (q) this.$router.replace({ path: "/results", query: { q } });
  }
}
</script>

<style scoped>
.search {
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 40fr 20fr;
}

.search > div:first-of-type {
  grid-column-start: span 3;
  display: inline-flex;
}

.search > label {
  text-align: right;
}

.search > input {
  grid-column-start: span 2;
}

form > div input {
  width: 33%;
}

.search input[type="submit"] {
  grid-column-start: 2;
}
</style>
