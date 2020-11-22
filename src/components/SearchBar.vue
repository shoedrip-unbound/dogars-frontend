<template>
  <input
    placeholder="Click here to Search..."
    ref="search"
    id="search"
    autocomplete="off"
    :value="value"
    @input="$emit('input', $event.target.value)"
    v-on:keydown.13="search()"
    name="q"
  />
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'

@Component
export default class SearchBar extends Vue {
  @Prop()
  value!: string

  search() {
    this.$router.push({ path: '/results', query: { q: this.value, reset: "1" } })
  }
}
</script>

<style scoped>
#search {
  width: 100%;
  display: block;
  min-height: 48px;
  font-family: 'Itim', cursive;
  border: 0;
  box-shadow: 0px 15px 30px -20px inset black;
  text-align: center;
  font-size: 2em;
  background-color: var(--content);
}

::placeholder {
  color: var(--text);
}
</style>
