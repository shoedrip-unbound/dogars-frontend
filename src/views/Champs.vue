<template>
  <div id="champs">
    <div id="opts">
      <label>Reverse? <input type="checkbox" v-model="reverse"/></label>
      <select @focus="error = ''" v-model="sort">
        <option value="total">Total battles</option>
        <option value="winratio">Win rate</option>
        <option value="wins">Wins</option>
        <option value="loses">Losses</option>
        <option value="elo">Elo</option>
        <option value="last_seen">Last seen</option>
      </select>
    </div>
    <DataPager class="flex" :endpoint="'/api/champs'" :query="$data" :comp="'ChampComponent'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DataPager from "@/components/DataPager.vue";

@Component({
  components: {
    DataPager
  }
})
export default class Champs extends Vue {
  sort: string = "total";
  reverse: boolean = false;
  spp: number = 16;
}
</script>

<style scoped>
#opts {
  display: table;
  margin: 0 auto 10px auto;
}
</style>
