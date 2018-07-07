<template>
<div id="replays">
  <div id="replsubmit">
    <h3>Submit a replay</h3>
    <input @focus="error = ''" v-model="link" placeholder="Link" type="text"/>
    <textarea @focus="error = ''" v-model="description" placeholder="Description"></textarea>
    <button :disabled="ready" @click="send()">Submit</button>
    <p v-if="error" class="error">{{error}}</p>
  </div>
  <DataPager :endpoint="endpoint" :comp="'ReplayComponent'"/>
  <router-link to="/replays/auto">Check automatic replays</router-link>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DataPager from "@/components/DataPager.vue";
import axios from "axios";

@Component({
  components: {
    DataPager
  }
})
export default class Replays extends Vue {
  link: string = "";
  description: string = "";

  error: string = '';
  nready: boolean = false;
  endpoint: string = '/api/replays';
  async send() {
    try {
      this.error = '';
      this.nready = true;
      await axios.post("/replays", {link: this.link, description: this.description});
      // force reload
      this.endpoint = '/api/replays';
    } catch (e) {
      this.error = 'Something happened :(';
    }
    this.nready = false;
  }
}
</script>

<style scoped>
.error {
  color: red;
}

#replsubmit {
  display: block;
  margin: 0 auto 0 auto;
  width: 50%;
  box-shadow: 0 0 10px 0px black;
  padding: 1px 20px 5px 20px;
  margin-bottom: 20px;
}

#replsubmit input,
#replsubmit textarea {
  width: 100%;
  resize: vertical;
}

button {
  margin-left: auto;
  display: block;
  margin-right: auto;
  font-family: Itim;
  font-size: 1.5em;
  cursor: pointer;
}

button:disabled {
  color: gray;
  cursor: wait;
}

#replsubmit > * {
  margin-bottom: 10px;
}
</style>
