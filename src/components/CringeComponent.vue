<template>
  <div class="cringe">
    <img :src="img"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { settings } from '@/settings';

@Component
export default class CringeComponent extends Vue {
  @Prop() data!: number;

  img: string = "";
  reload() {
    this.img = `${settings.domain}/cringec/${this.data}.png`;
  }

  mounted() {
    this.reload();
  }

  @Watch("data")
  obsData() {
    this.reload();
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>
