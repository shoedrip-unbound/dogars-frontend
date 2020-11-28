<template>
  <div id="sugg">
    <h2>Suggestion</h2>
    You can suggest banners or custom sprites for sets here.<br>
    For banners, dimensions must be 800x200. GIF are allowed.<br>
    For sets, a transparent background is highly recommended.<br>
    Max file size is 500kb<br>
    Use a free service to upload your images.<br>

    <label>URL</label><input @focus="error = ''" placeholder="Link to image..." type="text" v-model="url"/>
    <label>URL to set</label><input @focus="error = ''" placeholder="Link to set (leave empty for banner suggestions)..." type="text" v-model="link"/>
    <button :disabled="!ready" @click="send()">Submit</button>
    <p v-if="error" class="error">{{error}}</p>
    <p v-if="success" class="success">{{success}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Suggestion extends Vue {
  url: string = "";
  link: string = "";
  error: string = "";
  success: string = "";
  ready: boolean = true;
  async send() {
    try {
      this.ready = false;
      await axios.post("/api/contact", { sub: 'Suggestion', com: 
      `${this.url}\n${this.link}`
       });
      this.success = 'sent ;)';

    } catch (e) {
      this.error = "Something happened :(";
    }
    this.ready = true;
  }
}
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}

#sugg {
  display: grid;
  grid-row-gap: 15px;
}

button {
  cursor: pointer;
}
</style>
