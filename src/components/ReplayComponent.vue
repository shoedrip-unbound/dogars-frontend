<template>
    <div class="replay">
        <pre>{{data}}</pre>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

@Component
export default class ReplayComponent extends Vue {
  @Prop()
  data!: any;
}
</script>
