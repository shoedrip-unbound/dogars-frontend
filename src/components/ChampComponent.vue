<template>
    <div class="champ">
        <pre>{{data}}</pre>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

@Component
export default class ChampComponent extends Vue {
  @Prop()
  data!: any;
}
</script>
