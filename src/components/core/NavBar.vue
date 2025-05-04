<script setup lang="ts">
const props = defineProps<{
  drawer: boolean
}>()
watch(() => props.drawer, val => {
  _drawer.value = val
})
const _drawer = ref(true)

onMounted(() => {
  _drawer.value = props.drawer
})
</script>

<template>
  <v-navigation-drawer
    v-model="_drawer"
    :temporary="$vuetify.display.mobile"
  >
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
