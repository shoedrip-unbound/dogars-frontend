<template>
  <div id="changelog">
    <h2>Client</h2>
    <div v-for="ent in clientChanges" :key="ent.date">
      <p>({{new Date(ent.date).toLocaleDateString()}}) {{ent.subject}}</p>
      <p v-if="ent.message">{{ent.message}}</p>
    </div>
    <h2 v-if="serverChanges">Server</h2>
    <div v-for="ent in serverChanges" :key="ent.date">
      <p>({{new Date(ent.date).toLocaleDateString()}}) {{ent.subject}}</p>
      <p v-if="ent.message">{{ent.message}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";

@Component
export default class Changelog extends Vue {
  clientChanges = COMMITS;
  serverChanges: this["clientChanges"] = [];

  async mounted() {
    try {
      let res = await Axios.get<this["clientChanges"]>("/api/changelog");
      this.serverChanges = res.data;
    } catch (e) {}
  }
}
</script>
