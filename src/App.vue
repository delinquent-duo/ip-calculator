<template>
  <v-app> <TheHome /></v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheHome from '@/views/TheHome.vue';

@Component({ components: { TheHome } })
export default class App extends Vue {}
</script>
