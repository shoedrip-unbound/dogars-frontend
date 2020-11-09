<template>
  <div id="search">
      <h2>Advanced Search</h2>
      <form class="search" v-on:submit.prevent="search()">
          <div>
            <input placeholder="Name" v-model="name"/> 
            <div style="display: contents;"><span>(</span><input placeholder="Species" v-model="species"/><span>)@</span></div>
            <input placeholder="Item" v-model="item"/>
          </div>
          <label>Level: </label><input v-model="level"/>
          <label>Ability: </label><input v-model="ability"/>
          <label>- </label><input v-model="move_1"/>
          <label>- </label><input v-model="move_2"/>
          <label>- </label><input v-model="move_3"/>
          <label>- </label><input v-model="move_4"/>
          <label>Creator: </label><input v-model="creator"/>
          <label>Tripcode: </label><input v-model="hash"/>
          <label>Random pick?:</label>
          <input type="checkbox" v-model="random"/>
          <label>Format:</label>
          <select v-on:focus="error = ''" v-model="format">
            <option value="">Any format</option>
            <option value="ou">Any OU</option>
            <option value="doubles">Any Doubles</option>
            <optgroup v-for="group in groups" :key="group.value" :label="group.value">
              <option v-for="opt in group.child" :key="opt.id" :value="opt.id">{{opt.name}}</option>
            </optgroup>
          </select>
          <input type="submit">
      </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

type Format = { id: string; name: string; section: string };

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
  level: string = "";
  creator: string = "";
  hash: string = "";
  format: string = "";
  data: { [k in string]: Format } = {};
  groups: { [k in string]: { value: string; child: Format[] } } = {};
  random: boolean = false;
  [key: string]: any;

  search() {
    let q = JSON.parse(JSON.stringify(this.$data));
    for (let o in q) {
      if (q[o] == "" || Object.keys(q[o]).length == 0)
        delete q[o];
    }
    this.$router.push({ path: "/results", query: q });
  }

  async created() {
    let res = await axios.get<this["data"]>("/api/formats");
    let data = res.data;
    let grouplist = new Set(Object.keys(data).map(e => data[e].section));
    this.groups = {};
    for (let g of grouplist) {
      this.groups[g] = {
        child: Object.values(data).filter(e => e.section == g),
        value: g
      };
    }
    this.format = "";

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
