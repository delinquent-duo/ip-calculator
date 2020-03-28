<template>
  <div class="mt-12">
    <h1 class="display-2 font-weight-black primary--text text-center text-shadow">
      <span class="accent--text">{{ title.ip }}</span>
      {{ title.calculator }}
    </h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheHeader extends Vue {
  private readonly title = {
    ip: "IP",
    calculator: "Calculator"
  };
}
</script>
<style scoped>
.text-shadow {
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
}
</style>
