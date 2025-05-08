<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts";
import type {APIResponse, User} from "@/types";
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const store = useUserStore()
const users: ComputedRef<User[]> = computed(() => store.getUsers)

const headers = [
  {title: 'ID', key: 'id'},
  {title: "Nom d'utilisateur", key: 'name'},
  {title: 'Courriel', key: 'email'},
  {title: 'Rôle', key: 'role'},
  {title: 'Date de création', key: 'created_at'},
  {title: 'Date de mise à jour', key: 'updated_at'},
  {title: 'Actions', key: 'actions', sortable: false}
]

onMounted(async () => {
  const res: AxiosResponse<APIResponse<User[]>> = await axios.get("/users")
  if (res.status === 200) {
    if (res.data.data) {
      store.setUsers(res.data.data)
    }
  } else {
    console.error("Erreur lors de la récupération des utilisateurs")
  }

})

const deleteUser = async (user: User) => {
  const res: AxiosResponse<APIResponse<User>> = await axios.delete(`/users/${user.id}`)
  if (res.status === 200) {
    store.removeUser(user)
    console.log(res.data.message)
  } else {
    console.error("Erreur lors de la suppression de utilisateur")
  }
}

</script>

<template>
  <v-data-table :headers="headers" :hide-default-footer="users.length < 11" :items="users">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Liste des utilisateurs</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/admin/users/add">Ajouter un utilisateur</v-btn>
      </v-toolbar>
    </template>

    <template #item.actions="{ item }">
      <v-btn :to="'/admin/users/'+item.id" icon variant="text">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <ModalConfirmation title="Confirmation de la suppression" @confirm="() => deleteUser(item)">
        <template #activation="{props}">
          <v-btn icon v-bind="props" variant="text">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </ModalConfirmation>
    </template>
  </v-data-table>
</template>

<style lang="sass" scoped>

</style>
