<template>
  <SetComponent v-bind:data="set" />
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
    this.refresh(this.$route);
  }

  async refresh(route: this["$route"]) {
    let id = route.params.id;
    try {
      let req = await axios.get(`/api/sets/${id}`);
      this.set = req.data;
    } catch(e) {
      this.$router.push('/404');
    }
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
