<template>
  <v-footer absolute padless color="primary">
    <v-card flat width="100%" class="text-center transparent">
      <v-card-text class="d-flex flex-column white--text">
        <span class="caption">
          View Source Code on
          <a
            href="https://github.com/delinquent-duo/ip-calculator"
            class="secondary--text"
          >Github</a>.
        </span>
        <span class="caption">{{ new Date().getFullYear() }} &copy; IP Calculator</span>
        <span class="overline">
          <h4>Made with ❤️</h4>
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheFooter extends Vue {}
</script>
<style scoped>
</style>