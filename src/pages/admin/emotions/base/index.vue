<script lang="ts" setup>
import {useEmotionStore} from "@/stores/emotion.ts";
import type {APIResponse, Emotion, EmotionBase} from "@/types";
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
});

const store = useEmotionStore();
const emotions = computed(() => store.emotionsBase);
const loading = ref(true);

const headers = [
  {title: "ID", key: "id"},
  {title: "Nom", key: "name"},
  {title: "Actions", key: "actions", sortable: false},
];


onMounted(async () => {
  try {
    const [emotionsRes, emotionBasesRes]: [
      AxiosResponse<APIResponse<Emotion[]>>,
      AxiosResponse<APIResponse<EmotionBase[]>>
    ] = await Promise.all([
      axios.get("/emotions"),
      axios.get("/emotions/base"),
    ]);

    if (emotionsRes.status === 200 && emotionBasesRes.status === 200) {
      if (emotionBasesRes.data.data && emotionsRes.data.data) {
        store.setEmotions(emotionsRes.data.data);
        store.setEmotionsBase(emotionBasesRes.data.data);
      }
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des émotions:", err);
  } finally {
    loading.value = false;
  }
});

const deleteEmotion = async (emotion: EmotionBase) => {
  const res: AxiosResponse<APIResponse<Emotion>> = await axios.delete(`/emotions/base/${emotion.id}`);
  if (res.status === 200) {
    store.removeEmotionBase(emotion);
    console.log(res.data.message);
  } else {
    console.error("Erreur lors de la suppression de l'émotion");
  }
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :hide-default-footer="emotions.length < 11"
    :items="emotions"
    :loading="loading"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Liste des émotions de base</v-toolbar-title>
        <v-spacer />
        <v-btn
          :active="false"
          color="primary"
          to="/admin/emotions"
        >
          Liste des émotions
        </v-btn>
        <v-btn
          color="primary"
          to="/admin/emotions/base/add"
        >
          Ajouter une émotion de base
        </v-btn>
      </v-toolbar>
    </template>

    <template #item.actions="{ item }">
      <v-btn
        :to="`/admin/emotions/edit/base/${item.id}`"
        icon
        variant="text"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <ModalConfirmation
        title="Confirmation de la suppression"
        @confirm="() => deleteEmotion(item)"
      >
        <template #activation="{ props }">
          <v-btn
            icon
            v-bind="props"
            variant="text"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </ModalConfirmation>
    </template>
  </v-data-table>
</template>
