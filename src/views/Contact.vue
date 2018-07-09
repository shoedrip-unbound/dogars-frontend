<template>
  <div id="contact">
    <h2>Contact</h2>
    You can anonymously contact me here.<br>

    <label>Subject: </label><input @focus="error = ''" placeholder="Can be empty..." type="text" v-model="sub"/>
    <label>Message: </label><textarea  @focus="error = ''" placeholder="Please do not be empty..." v-model="com"></textarea>
    <button :disabled="!ready" @click="send()">Submit</button>
    <p v-if="error" class="error">{{error}}</p>
    <p v-if="success" class="success">{{success}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Contact extends Vue {
  sub: string = "";
  com: string = "";
  error: string = "";
  success: string = "";
  ready: boolean = true;
  async send() {
    try {
      this.ready = false;
      await axios.post("/api/contact", { sub: this.sub, com: this.com });
      this.success = 'sent ;)';
      this.sub = this.com = '';
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

#contact {
  display: grid;
  grid-row-gap: 15px;
}

button {
  cursor: pointer;
}
</style>
