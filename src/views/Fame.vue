<template>
  <div id="fame">
    <DataPager :endpoint="'/api/fame'" :comp="'SetComponent'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataPager from "@/components/DataPager.vue";

@Component({
  components: {
    DataPager,
  }
})
export default class Fame extends Vue {
}
</script>
