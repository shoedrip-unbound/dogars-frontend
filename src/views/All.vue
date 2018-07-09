<template>
  <div id="all">
    <DataPager :endpoint="'/api/sets'" :comp="'SetComponent'"/>
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
export default class All extends Vue {
}
</script>
