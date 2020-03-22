<template>
  <TheHeader />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheHeader from '@/components/home/TheHeader.vue';

@Component({ components: { TheHeader } })
export default class TheHome extends Vue {}
</script>
