<template>
  <div class="flex-wrap">
    <label class="heart-switch">
      <input type="checkbox" :checked="checked" v-on:click="$emit('click', checked)" />
      <svg viewBox="0 0 33 27" fill="white">
        <path
          d="m 23.5,0.5 c 4.5,0 9,4 9,9 0,7.5 -11,17 -16,17 -5,0 -16,-9.5 -16,-17 0,-5 4,-9 9,-9 2.8,0 5.35,1.3 7.05,3.35 C 18.15,1.8 20.6,0.5 23.5,0.5 Z"
        />
      </svg>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'

@Component
export default class HeartCheckBox extends Vue {
  @Prop()
  checked!: boolean;
}
</script>

<style scoped>
    .heart-switch {
        --stroke: #d1d6ee;
        --stroke-active: #ec4472;
        --fill: #fff;
        --fill-active: #ec638e;
        cursor: pointer;
        position: relative;
        transform: scale(var(--s, 1)) translateZ(0);
        transition: transform 0.2s;
        -webkit-tap-highlight-color: transparent;
    }
    .heart-switch:active {
        --s: 0.95;
    }
    .heart-switch input {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: absolute;
        outline: none;
        border: none;
        pointer-events: none;
        z-index: 1;
        margin: 0;
        padding: 0;
        left: 1px;
        top: 1px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #ffbaba;
    }
    .heart-switch input + svg {
        width: 33px;
        height: 27px;
        fill: var(--fill);
        stroke: var(--stroke);
        stroke-width: 1px;
        stroke-linejoin: round;
        display: block;
        transition: stroke 0.4s, fill 0.4s;
    }
    .heart-switch input:not(:checked) {
        animation: uncheck 0.4s linear forwards;
    }
    .heart-switch input:checked {
        animation: check 0.4s linear forwards;
    }
    .heart-switch input:checked + svg {
        --fill: var(--stroke-active);
        --stroke: var(--stroke-active);
    }

    @keyframes uncheck {
        0% {
            transform: rotate(-30deg) translateX(13.5px) translateY(8px);
        }
        50% {
            transform: rotate(30deg) translateX(9px);
        }
        75% {
            transform: rotate(30deg) translateX(4.5px) scaleX(1.1);
        }
        100% {
            transform: rotate(30deg);
        }
    }
    @keyframes check {
        0% {
            transform: rotate(30deg);
        }
        25% {
            transform: rotate(30deg) translateX(4.5px) scaleX(1.1);
        }
        50% {
            transform: rotate(30deg) translateX(9px);
        }
        100% {
            transform: rotate(-30deg) translateX(13.5px) translateY(8px);
        }
    }
    .flex-wrap {
        display: inline-flex;
        float: right;
    }

</style>
