<script lang="ts" setup>
const copyrightName = computed(() => {
  const isDev = import.meta.env.DEV;
  const version = import.meta.env.VITE_FRONT_VERSION || "ERROR";
  console.log(import.meta.env);
  return isDev ? `CESIZen - DEV (${version}) ` : `CESIZen (${version})`;
});
</script>
<template>
  <v-footer
    app
    height="40"
  >
    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">{{ copyrightName }}</span>
    </div>
  </v-footer>
</template>

