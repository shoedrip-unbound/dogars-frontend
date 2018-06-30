<template>
  <SetComponent v-bind:data="set"/>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SetComponent from "@/components/SetComponent.vue"; // @ is an alias to /src
import axios from "axios";
import { Sets } from "@/Models/Sets";

@Component({
  components: {
    SetComponent
  }
})
export default class Set extends Vue {
  set: any = {};

  created() {
    console.log("create");
    let id = this.$route.params.id;
    axios.get(`/api/sets/${id}`).then(s => {
      this.set = s.data;
    });
  }

  refresh(route: this["$route"]) {
    let id = route.params.id;
    axios.get(`/api/sets/${id}`).then(s => {
      this.set = s.data;
    });
  }

  @Watch("$route")
  watchRoute(newv: this["$route"]) {
    this.refresh(newv);
  }

  beforeRouteUpdate(to: this["$route"], from: any, next: any) {
    this.refresh(to);
    next();
  }
}
</script>
