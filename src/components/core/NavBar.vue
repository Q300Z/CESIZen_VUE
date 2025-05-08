<script lang="ts" setup>
const props = defineProps<{
  drawer: boolean
}>()
watch(() => props.drawer, val => {
  _drawer.value = !_drawer.value
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
    <template #prepend>
      <v-list>
        <v-list-item link prepend-icon="mdi-home" title="Accueil" to="/"/>
        <v-list-item link prepend-icon="mdi-format-list-text" title="Informations" to="/info"/>
        <v-list-item v-role="['user','admin']" link prepend-icon="mdi-emoticon-happy-outline" title="Tracker"
                     to="/tracker"/>
      </v-list>
    </template>
    <template #append>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-role="['admin']" link prepend-icon="mdi-account-group" title="Gestion utilisateurs"
                     to="/admin/users"/>
        <v-list-item v-role="['admin']" link prepend-icon="mdi-format-list-text" title="Gestion articles"
                     to="/admin/infos"/>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style lang="sass" scoped>

</style>
