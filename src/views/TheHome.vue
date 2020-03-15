<template>
  <h1>{{ welcomeMessage }}</h1>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheHome extends Vue {
  private welcomeMessage = 'Here Lies the View';
}
</script>
