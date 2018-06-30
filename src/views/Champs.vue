<template>
<div id="champs">
  <DataPager class="flex" :endpoint="'/api/champs'" :comp="'ChampComponent'"/>
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
export default class Champs extends Vue {
}
</script>

<style scoped>

</style>
