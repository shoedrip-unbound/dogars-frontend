<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';

@Component
export default class Random extends Vue {
  created() {
    axios.get('/api/random').then(id => {
      console.log(id);
      this.$router.replace(`/set/${id.data}`);
    });
  }
}
</script>
