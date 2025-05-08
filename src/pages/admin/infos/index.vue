<script setup lang="ts">
import {useArticleStore} from "@/stores/article.ts";
import type {APIResponse, Article} from "@/types";
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const store=useArticleStore()
const articles:ComputedRef<Article[]> = computed(()=>store.articles)

const headers = [
  { title: 'ID', key: 'id' },
  { title: "Nom d'utilisateur", key: 'title' },
  { title: 'Courriel', key: 'description' },
  { title: 'Date de création', key: 'created_at' },
  { title: 'Date de mise à jour', key: 'updated_at' },
  { title: 'Actions', key: 'actions', sortable: false }
]

onMounted(async ()=>{
  const res:AxiosResponse<APIResponse<Article[]>> =await axios.get("/articles")
  if (res.status === 200){
    if (res.data.data){
      store.setArticles(res.data.data)
    }
  }
  else{
    console.error("Erreur lors de la récupération des artilces")
  }

})

const deleteArticle = async (article:Article)=>{
  const res:AxiosResponse<APIResponse<Article>> = await axios.delete(`/articles/${article.id}`)
  if (res.status === 200){
      store.removeArticle(article)
      console.log(res.data.message)
  }else{
    console.error("Erreur lors de la suppression de l'article")
  }
}

</script>

<template>
<v-data-table :items="articles" :hide-default-footer="articles.length < 11" :headers="headers">
  <template #top>
    <v-toolbar flat>
      <v-toolbar-title>Liste des utilisateurs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/admin/infos/add">Ajouter un utilisateur</v-btn>
    </v-toolbar>
  </template>

  <template #item.actions="{ item }">
    <v-btn icon :to="'/admin/infos/edit/'+item.id" variant="text">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <ModalConfirmation @confirm="() => deleteArticle(item)" title="Confirmation de suppression">
      <template #activation="{props}">
        <v-btn icon variant="text" v-bind="props">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </ModalConfirmation>
  </template>
</v-data-table>
</template>

<style scoped lang="sass">

</style>
