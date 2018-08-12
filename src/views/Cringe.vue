<template>
  <div id="cringe">
    <h1>Cringe compilation</h1>
    <p>Say *snap* in chat to get added to my cringe compilation. New snaps are added at the top in real-time</p>
    <InfinityViewer @bottom="loadOlder" :maxed="maxed" :list="cringe" :comp="'CringeComponent'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as SockJS from "sockjs-client";
import CringeComponent from "@/components/CringeComponent.vue";
import InfinityViewer from "@/components/InfinityViewer.vue";
import { settings } from '@/settings';

let range = (min: number, max?: number) => {
  let ret = [];
  if (max === undefined) {
    max = min;
    min = 0;
  }
  let rev = max < min;
  if (rev) {
    let t = min;
    min = max;
    max = t;
  }
  for (let i = min; i < max; ++i) {
    ret.push(i);
  }
  rev && ret.reverse();
  return ret;
};

@Component({
  components: {
    CringeComponent,
    InfinityViewer
  }
})
export default class Cringe extends Vue {
  cringe: number[] = [1, 2, 3];
  maxed: boolean = false;
  sock: WebSocket = new SockJS(`${settings.domain}/cringep`);

  newest = 0;
  oldest = 0;
  inited = false;

  loadOlder() {
    this.oldest = this.oldest - 15;
    if (this.oldest <= 1) this.oldest = 1;
    this.cringe = range(this.newest + 1, this.oldest);
  }

  created() {
    this.sock.onmessage = ev => {
      let npics = JSON.parse(ev.data);
      this.newest = npics;
      if (!this.inited) {
        this.oldest = this.newest;
      } else {
        this.oldest += 15;
      }
      this.loadOlder();
      this.inited = true;
    };
  }
}
</script>

<style scoped>

</style>
