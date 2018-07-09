<template>
  <div>
    <h2>Contact</h2>
    You can anonymously contact me here.<br>

    <label>Subject: </label><input @focus="error = ''" placeholder="Can be empty..." type="text" style="width: 500px;" v-model="sub"/>
    <label>Message: </label><textarea  @focus="error = ''" placeholder="Please do not be empty..." style="width: 500px; height: 151px;" v-model="com"></textarea>
    <button :disabled="!ready" @click="send">Submit</button>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';

@Component
export default class Contact extends Vue {
  sub: string = '';
  com: string = '';
  error: string = '';
  ready: boolean = true;
  async send() {
    try {
      this.ready = false;
      await axios.post('/api/contact', {sub: this.sub, com: this.com});

    } catch (e) {
      this.error = 'Something happened :(';
    }
    this.ready = true;
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
