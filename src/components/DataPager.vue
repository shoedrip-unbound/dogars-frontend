<template>
  <div class="datapager">
    <div v-show="ready">
      <PageSelector
        :current="current"
        :total="total"
        :spp="spp"
        v-on:first="goToFirst()"
        v-on:previous="goToPrevious()"
        v-on:next="goToNext()"
        v-on:last="goToLast()"
      />
      <div class="page">
        <component
          :is="comp"
          v-for="(data, idx) in dataarr"
          :key="idx"
          :data="data"
        ></component>
      </div>
      <PageSelector
        :current="current"
        :total="total"
        :spp="spp"
        v-on:first="goToFirst()"
        v-on:previous="goToPrevious()"
        v-on:next="goToNext()"
        v-on:last="goToLast()"
      />

      <div class="nothing" v-if="dataarr && dataarr.length == 0">
        <h1>Wow! There's fucking nothing!</h1>
        <img src="@/assets/wow.png" />
      </div>
    </div>
    <div v-show="!ready">
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SetComponent from '@/components/SetComponent.vue'
import ReplayComponent from '@/components/ReplayComponent.vue'
import ChampComponent from '@/components/ChampComponent.vue'
import PageSelector from '@/components/PageSelector.vue'

import axios from 'axios'
import { Sets } from '@/Models/Sets'

@Component({
  components: {
    SetComponent,
    ReplayComponent,
    PageSelector,
    ChampComponent,
  },
})
export default class DataPager extends Vue {
  dataarr: Sets[] = []
  current: number = 1
  current_query?: string
  total: number = 0
  spp: number = 15
  totalp: number = 0

  @Prop() endpoint!: string

  @Prop() comp!: string

  @Prop({
    type: Object,
    default: () => {
      return {}
    },
  })
  query!: any

  ready: boolean = false
  async reload() {
    this.ready = false
    let q = JSON.parse(JSON.stringify(this.query))
    if (q.spp) this.spp = q.spp
    if (q.q == this.current_query) q.page = this.current
    else this.current = 1
    this.current_query = q.q
    //this.current = q.page == undefined ? 1 : +q.page
    q = Object.keys(q)
      .map((k) => `${k}=${encodeURIComponent(q[k])}`)
      .join('&')
    try {
      let s = await axios.get<[number, Sets[]]>(`${this.endpoint}?${q}`)
      this.total = +s.data[0]
      this.totalp = ~~(this.total / this.spp) + +(this.total % this.spp !== 0)
      this.dataarr = s.data[1]
    } catch (e) {
      this.total = 0
      this.totalp = 0
      this.dataarr = []
    }
    this.navigate()
    this.ready = true
  }

  navigate() {
    let q = JSON.parse(JSON.stringify(this.query))
    q.page = '' + this.current
    this.$router.push({
      path: this.$route.path,
      query: q,
    })
  }

  goToFirst() {
    this.current = 1
  }

  goToPrevious() {
    if (this.current > 1) this.current--
  }

  goToNext() {
    if (this.current < this.totalp) this.current++
  }

  goToLast() {
    this.current = this.totalp
  }

  created() {
    this.current = +this.$route.query.page || 1
    this.reload()
  }

  @Watch('$props', { deep: true, immediate: false })
  @Watch('current')
  paramModified() {
    this.reload()
  }
}
</script>

<style scoped>
.nothing {
  text-align: center;
}

.flex > div > .page {
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
