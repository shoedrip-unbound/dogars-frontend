<template>
  <div id="settings">
    <p>Build #{{ version }} ({{ commit }})</p>
    <h2>Theme ({{ stheme }})</h2>
    <div v-for="theme in themes" :key="theme">
      <label
        >{{ theme
        }}<radio class="inlined" v-model="stheme" :value="theme"></radio
      ></label>
    </div>
    <label
      >Custom<radio class="inlined" v-model="stheme" :value="'Custom'"></radio
    ></label>
    <div class="selectcontainer" v-if="stheme == 'Custom'">
      <div v-for="prop in keyprops" :key="prop">
        {{ props[prop]
        }}<radio class="inlined" v-model="customizing" :value="prop"></radio>
      </div>
      <chrome v-model="custom[customizing]"></chrome>
    </div>
    <h2>Waifu ({{ swaifu }})</h2>
    <div v-for="waifu in waifus" :key="waifu">
      <label
        >{{ waifu
        }}<radio class="inlined" v-model="swaifu" :value="waifu"></radio
      ></label>
    </div>
    <label
      >Custom<radio class="inlined" v-model="swaifu" :value="'Custom'"></radio
    ></label>
    <div v-if="swaifu == 'Custom'">URL: <input v-model="wurl" /></div>
    <h2>Sprites</h2>
    <label>Use 2D sprites<input @change="toggle2d" v-model="state2d" type="checkbox" /></label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DataPager from '@/components/DataPager.vue'
import {
  getCurrentTheme,
  loadTheme,
  themeProps,
  themeProp,
  loadedTheme,
  loadWaifu,
  getCurrentWaifu,
  get2DSpriteEnabled,
  set2DSpriteEnabled,
} from '@/ThemeManager.ts'
import { Chrome } from 'vue-color'
import Waifu from '@/components/Waifu.vue'
import { settings } from '@/settings'

let waifuToURL: { [k: string]: string } = {
  Lillie: `${settings.domain}/lillie2.png`,
  Moon: `${settings.domain}/moon.png`,
}

function getCurrentWaifuName(url: string): string {
  if (!url || url == 'None') return 'None'
  for (let i in waifuToURL) if (url == waifuToURL[i]) return i
  return 'Custom'
}

type color = { hex?: string }
@Component({
  components: {
    DataPager,
    Chrome,
  },
})
export default class Settings extends Vue {
  version = VERSION
  commit = COMMIT
  themes = ['Light', 'Dark']
  waifus = ['None', 'Lillie', 'Moon']
  props = {
    oof: 'Background',
    content: 'Foreground',
    highlight: 'Highlight',
    text: 'Text',
  }
  keyprops = Object.keys(this.props)
  customizing = 'oof'
  stheme: string = getCurrentTheme()
  wurl: string = getCurrentWaifu()
  swaifu: string = getCurrentWaifuName(this.wurl)
  state2d: boolean = get2DSpriteEnabled();

  custom: any = {
    oof: {},
    text: {},
    content: {},
    highlight: {},
  }

  created() {
  }

  toggle2d() {
    set2DSpriteEnabled(this.state2d);
  }

  initCustom() {
    this.custom.oof.hex = loadedTheme.oof!
    this.custom.content.hex = loadedTheme.content!
    this.custom.highlight.hex = loadedTheme.highlight!
    this.custom.text.hex = loadedTheme.text!
  }

  @Watch('custom', { deep: true })
  customChanged(newValue: string) {
    let keys = Object.keys(loadedTheme).forEach((k: string) => {
      let p = k as themeProp
      loadedTheme[p] = this.custom[p].hex
    })
    loadTheme(loadedTheme)
  }

  @Watch('stheme')
  reloadTheme(newName: string) {
    if (newName == 'Custom') return this.initCustom()
    loadTheme(newName)
  }

  @Watch('wurl')
  reloadUrlWaify(newName: string) {
    loadWaifu(newName)
  }

  @Watch('swaifu')
  reloadWaifu(newName: string) {
    if (newName == 'Custom') return
    let url = waifuToURL[newName]
    loadWaifu(url)
  }
}
</script>

<style>
.inlined {
  display: inline;
}
</style>
