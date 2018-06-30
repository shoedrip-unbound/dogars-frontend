<template>
<div id="all">
  <DataPager :endpoint="'/api/replays/auto'" :comp="'ReplayComponent'"/>
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
