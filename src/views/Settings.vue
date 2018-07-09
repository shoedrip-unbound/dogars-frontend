<template>
<div id="settings">
  <p>Build #{{version}} ({{commit}})</p>
  <h2>Theme</h2>
  <div v-for="theme in themes" :key="theme">
    <label>{{theme}}<input v-model="stheme" :value="theme" type="radio"></label>
  </div>
  <h2>Waifu</h2>
  <div v-for="waifu in waifus" :key="waifu">
    <label>{{waifu}}<input v-model="swaifu" :value="waifu" type="radio"></label>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DataPager from "@/components/DataPager.vue";
import { getCurrentTheme, loadTheme } from "@/ThemeManager.ts";

@Component({
  components: {
    DataPager
  }
})
export default class Settings extends Vue {
  version = VERSION;
  commit = COMMIT;
  themes = ["Light", "Dark"];
  waifus = ["None", "Lillie", "Moon"];

  stheme: string = getCurrentTheme();
  swaifu: string = "None";

  @Watch('stheme')
  reloadTheme(newName: string) {
    loadTheme(newName);
  }
}
</script>
