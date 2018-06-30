<template>
<div id="all">
  <div id="replsubmit">
  </div>
  <DataPager :endpoint="'/api/replays'" :comp="'ReplayComponent'"/>
  <router-link to="/replays/auto">Check automatic replays</router-link>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataPager from "@/components/DataPager.vue";

@Component({
  components: {
    DataPager
  }
})
export default class Replays extends Vue {
}
</script>
