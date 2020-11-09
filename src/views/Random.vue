<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import { root } from '@/main'

@Component
export default class Random extends Vue {
  created() {
    // hack
    if (root.$children[0].$data.word != '') {
      this.$router.push({ path: '/search', query: { q: root.$children[0].$data.word, random: "true" } })
    } else {
      axios.get('/api/random').then(id => {
        this.$router.replace(`/set/${id.data}`)
      })
    }
  }
}
</script>
