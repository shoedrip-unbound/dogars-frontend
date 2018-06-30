<template>
<div id="results">
  <DataPager :endpoint="endpoint" :comp="'SetComponent'" :query="this.$route.query"/>
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
export default class Results extends Vue {
  endpoint = "/api/search";
}
</script>
