<template>
  <div class="mt-12">
    <h1 class="display-2 font-weight-black primary--text text-center">
      <span class="accent--text">{{ title.ip }}</span>
      {{ title.calculator }}
    </h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheHeader extends Vue {
  private readonly title = {
    ip: 'IP',
    calculator: 'Calculator'
  };
}
</script>
