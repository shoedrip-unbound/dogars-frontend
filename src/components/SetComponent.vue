<template>
  <div v-if="data.species && data.species != ''" class="set">
    <h3>
      <router-link :to="`/set/${data.id}`">{{data.name || data.species}}</router-link>
    </h3>
    <div class="wrapper">
      <img :class="{setImage:true, custom: data.has_custom}" :src="imgUrl" />
    </div>
    <table>
      <tbody :class="{editing: this.editing || this.deleting}" ref="troot">
        <tr v-if="data.description">
          <th scope="row" align="right">Description</th>
          <td ref="desc" :contenteditable="this.editing" @keydown="checkLength">{{data.description}}</td>
        </tr>
        <tr>
          <th scope="row" align="right">Date added</th>
          <td>{{datestring}}</td>
        </tr>
        <tr v-if="data.creator">
          <th scope="row" align="right">Creator</th>
          <td>{{data.creator}}</td>
        </tr>
        <tr v-if="data.hash">
          <th scope="row" align="right">Tripcode</th>
          <td
            ref="trip"
            :contenteditable="this.editing || this.deleting"
            placeholder="Verify your trip..."
          >{{data.hash}}</td>
        </tr>
        <tr>
          <th scope="row" align="right">Format</th>
          <td>{{data.format}}</td>
        </tr>
      </tbody>
    </table>
    <textarea ref="ta" v-on:focus="focused($event)" v-model="description"></textarea>
    <div v-show="$route.path.match(/\/set/) && data.hash">
      <button
        ref="butt"
        :disabled="this.deleting"
        @click="toggleEdit()"
      >{{!this.editing ? "Update" : "Done?"}}</button>
      <button
        ref="dbutt"
        :disabled="this.editing"
        @click="toggleDelete()"
      >{{!this.deleting ? "Delete" : "Done?"}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { Sets } from "@/Models/Sets";
import { getPokemonImage, setToString } from "../utils";
import axios from "axios";

let tgl = (elem: Element) => {
  if (elem.hasAttribute("contenteditable"))
    elem.removeAttribute("contenteditable");
  else elem.setAttribute("contenteditable", "true");
};

@Component
export default class SetComponent extends Vue {
  @Prop({ required: true })
  data!: any;

  datestring: string = "";
  imgUrl: string = "";
  description = "";
  editing = false;
  deleting = false;

  focused(ev: FocusEvent) {
    let ta = ev.srcElement! as HTMLTextAreaElement;
    ta.select();
  }

  reload() {
    let k = new Date(+this.data.date_added!);
    this.datestring = k.toDateString();
    this.imgUrl = getPokemonImage(this.data);
    this.description = setToString(this.data);
    let tab = this.$refs["ta"];
    if (!tab) return;
    let ta = tab as HTMLTextAreaElement;
    ta.rows = this.description.split("\n").length;
  }

  beforeUpdate() {
    this.reload();
  }

  mounted() {
    this.reload();
  }

  arbitrary: any;

  async toggleDelete() {
    let elem = this.$refs["trip"] as Element;

    if (!this.deleting) {
      this.arbitrary = elem.textContent;
      elem.textContent = "";
    } else {
      if (elem.textContent) {
        try {
          let res = await axios.delete<{ success: boolean }>(
            `/api/sets/${this.data.id}`,
            {
              data: {
                id: this.data.id,
                trip: elem.textContent
              }
            }
          );
          this.$router.push("/");
        } catch (e) {
          elem.textContent = "Something went wrong ;)";
        }
      } else elem.textContent = this.arbitrary["trip"];
    }
    this.deleting = !this.deleting;
  }

  async toggleEdit() {
    let desc = this.$refs["desc"] as Element;
    let elem = this.$refs["trip"] as Element;

    if (!this.editing) {
      this.arbitrary = {
        trip: elem.textContent,
        desc: desc.textContent,
        set: this.description
      };
      elem.textContent = "";
    } else {
      if (elem.textContent) {
        // user wants to update
        try {
          let res = await axios.put<{ success: boolean }>(
            `/api/sets/${this.data.id}`,
            {
              id: this.data.id,
              desc: desc.textContent,
              set: this.description,
              trip: elem.textContent
            }
          );
          // successful, hide the trip
          elem.textContent = this.arbitrary["trip"];
        } catch (e) {
          // something failed, reset fields
          elem.textContent = "Something went wrong ;)";
          desc.textContent = this.arbitrary["desc"];
          this.description = this.arbitrary["set"];
        }
      } else {
        // operation aborted
        desc.textContent = this.arbitrary["desc"];
        elem.textContent = this.arbitrary["trip"];
        this.description = this.arbitrary["set"];
      }
    }
    this.editing = !this.editing;
  }

  checkLength(e: Event) {
    let desc = this.$refs["desc"] as Element;
    if (desc.textContent!.length >= 650) e.preventDefault();
  }

  updated() {
    this.reload();
  }

  @Watch("data")
  obsData() {
    this.reload();
  }
}
</script>

<style scoped>
.set {
  width: 60%;
  margin: 0 auto 0 auto;
}

[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  display: block;
}

button {
  display: inline-block;
  font-size: 2em;
}

button:disabled {
  color: var(--oof);
}

button:first {
  float: left;
}

button:last-of-type {
  float: right;
}

.editing [contenteditable="true"] {
  background-color: var(--oof);
}

.set > h3,
.set > .wrapper {
  text-align: center;
}

p {
  margin: 0;
}

#wrapper {
  display: inline-block;
}

img {
  image-rendering: pixelated;
}

.custom {
  max-width: 100%;
}

textarea {
  width: 100%;
  resize: none;
}

table {
  width: 100%;
  border: 1px solid;
  margin-bottom: 5px;
  padding: 0;
  border-spacing: 0;
  border-collapse: collapse;
  box-sizing: border-box;
}

tr :nth-child(2n + 1) {
  background-color: var(--oof);
  border-right: 1px solid;
  white-space: nowrap;
  width: 1%;
  padding: 10px;
}

td {
  padding: 10px;
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  .set > h3 {
    font-size: 2em;
  }

  .set {
    width: 100%;
  }

  .set img {
    min-height: 25vh;
    image-rendering: initial;
  }
}
</style>
