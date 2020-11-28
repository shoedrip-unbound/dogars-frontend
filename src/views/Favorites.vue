<template>
<div>
  <h1>Favorites</h1>
    <SetComponent          
     v-for="(data, idx) in dataarr"
          :key="idx"
          :data="data"/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SetComponent from "@/components/SetComponent.vue"; // @ is an alias to /src
import axios, { AxiosResponse } from "axios";
import { Sets } from "@/Models/Sets";
import { faves } from "@/utils";

@Component({
  components: {
    SetComponent,
  }
})
export default class Favorites extends Vue {
  dataarr: Sets[] = []

  async mounted() {
    console.log('mounting')
    this.dataarr = await Promise.all(faves.map(async id => {
      const res = await axios.get<Sets>("/api/sets/" + id);
      return res.data;
    }));
    console.log('dataarr', this.dataarr)
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
