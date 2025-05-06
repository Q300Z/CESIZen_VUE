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
  <template #append>
    <v-divider></v-divider>
    <v-list>
    <v-list-item v-role="['admin']" link prepend-icon="mdi-account-group" title="Gestion utilisateurs" to="/admin/users"/>
    </v-list>
  </template>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
