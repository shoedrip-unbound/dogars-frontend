<template>
<div class="datapager">
  <div v-show="ready">
    <PageSelector :current="current" :total="total" :spp="spp" 
    v-on:first="goToFirst()"
    v-on:previous="goToPrevious()"
    v-on:next="goToNext()"
    v-on:last="goToLast()"
    />
    <div class="page">
      <component :is="comp" v-for="(data, idx) in dataarr" :key="idx" :data="data"></component>
    </div>
  </div>
  <div v-show="!ready">
    <h2>Loading...</h2>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SetComponent from "@/components/SetComponent.vue";
import ReplayComponent from "@/components/ReplayComponent.vue";
import ChampComponent from "@/components/ChampComponent.vue";
import PageSelector from "@/components/PageSelector.vue";

import axios from "axios";
import { Sets } from "@/Models/Sets";

@Component({
  components: {
    SetComponent,
    ReplayComponent,
    PageSelector,
    ChampComponent
  }
})
export default class DataPager extends Vue {
  dataarr: any = null;
  current: number = 1;
  total: number = 0;
  spp: number = 15;
  totalp: number = 0;

  @Prop() endpoint!: string;

  @Prop() comp!: string;

  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  query!: any;

  ready: boolean = false;
  reload() {
    this.ready = false;
    let q = JSON.parse(JSON.stringify(this.query));
    if (q.spp)
      this.spp = q.spp;
    q.page = this.current;
    q = Object.keys(q)
      .map(k => `${k}=${encodeURIComponent(q[k])}`)
      .join("&");
    axios.get(`${this.endpoint}?${q}`).then(s => {
      this.total = +s.data[0];
      this.totalp = ~~(this.total / this.spp) + +(this.total % this.spp !== 0);
      this.dataarr = s.data[1];
      this.ready = true;
      this.navigate();
    });
  }

  navigate() {
    let q = JSON.parse(JSON.stringify(this.query));
    q.page = "" + this.current;
    this.$router.push({
      path: this.$route.path,
      query: q
    });
  }

  goToFirst() {
    this.current = 1;
  }

  goToPrevious() {
    if (this.current > 1) this.current--;
  }

  goToNext() {
    if (this.current < this.totalp) this.current++;
  }

  goToLast() {
    this.current = this.totalp;
  }

  created() {
    this.current = +this.$route.query.page || 1;
    this.reload();
  }

  @Watch('$props', {deep: true, immediate: false})
  @Watch('current')
  paramModified() {
    this.reload();
  }
}
</script>

<style scoped>
.flex > div > .page{
  display: inline-flex;
  flex-wrap: wrap;
}
</style>
