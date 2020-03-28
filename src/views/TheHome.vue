<template>
  <div>
    <TheHeader />
    <TheFooter />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/home/TheHeader.vue";
import TheFooter from "@/components/home/TheFooter.vue";

@Component({ components: { TheHeader, TheFooter } })
export default class TheHome extends Vue {}
</script>
