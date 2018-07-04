<template>
  <div ref="root">
    <component :is="comp" v-for="(data, idx) in list" :key="idx" :data="data"></component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CringeComponent from "@/components/CringeComponent.vue";

@Component({
  components: {CringeComponent}
})
export default class InfinityViewer extends Vue {
  @Prop() comp!: string;
  @Prop() list!: any[];
  @Prop() maxed!: boolean;

  reachedBottom() {
    let d = document.body.scrollHeight - (window.innerHeight + window.scrollY);
    return d <= 55;
  }

  created() {
    window.addEventListener("scroll", this.runloads);
  }

  runloads() {
    if (!this.maxed && this.reachedBottom()) {
      this.$emit("bottom");
    }
  }

  mounted(e: any) {
    this.runloads();
  }

  destroyed() {
    window.removeEventListener("scroll", this.runloads);
  }
}
</script>

<style scoped>
</style>
