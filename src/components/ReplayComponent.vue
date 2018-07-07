<template>
    <div class="replay">
        <a :href="data.link">{{data.link}}</a>
        <hr>
        <p>{{data.description}}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

@Component
export default class ReplayComponent extends Vue {
  @Prop() data!: any;
}
</script>

<style scoped>
.replay {
  border: 1px solid;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 6px 0 0px;
  border-radius: 10px;
  margin-bottom: 30px;
}

hr {
  border-bottom: none;
  border-top: 1px solid;
}
</style>
