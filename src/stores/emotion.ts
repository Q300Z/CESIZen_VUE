// Utilities
import {defineStore} from 'pinia';
import {type Emotion, type EmotionBase} from '@/types';
import {useStorage} from '@vueuse/core';

export const useEmotionStore = defineStore('emotion', {
  state: () => ({
    emotions: useStorage("emotions", [] as Emotion[], localStorage),
    emotionsBase: useStorage("emotionsBase", [] as EmotionBase[], localStorage),
  }),

  getters: {
    getEmotionById: (state) => {
      return (id: number): Emotion | undefined => state.emotions.find((emotion: Emotion) => emotion.id === id);
    },
    getEmotionBaseById: (state) => {
      return (id: number) => state.emotionsBase.find((emotionBase: EmotionBase) => emotionBase.id === id);
    },
    getEmotionByEmotionsBase: (state) => {
      return state.emotions.map((e: Emotion) => ({
        ...e,
        emotionBaseName: state.emotionsBase.find((b: EmotionBase) => b.id === e.emotionBaseID)?.name || "Inconnue",
      }));
    },
    getEmotionByEmotionsBaseById: (state) => {
      return (id: number) => {
        const emotion = state.emotions.find((emotion: Emotion) => emotion.id === id);
        if (emotion) {
          return {
            ...emotion,
            emotionBaseName: state.emotionsBase.find((b: EmotionBase) => b.id === emotion.emotionBaseID)?.name || "Inconnue",
          };
        }
        return null;
      };
    }
  },

  actions: {
    addEmotion(emotion: Emotion) {
      this.emotions.push(emotion);
    },
    setEmotions(newEmotions: Emotion[]) {
      this.emotions = newEmotions;
    },
    updateEmotion(emotion: Emotion) {
      const index = this.emotions.findIndex(a => a.id === emotion.id);
      if (index !== -1) {
        this.emotions[index] = emotion;
      }
    },
    removeEmotion(emotion: Emotion) {
      const index = this.emotions.findIndex(a => a.id === emotion.id);
      if (index !== -1) {
        this.emotions.splice(index, 1);
      }
    },
    addEmotionBase(emotionBase: EmotionBase) {
      this.emotionsBase.push(emotionBase);
    },
    setEmotionsBase(newEmotionsBase: EmotionBase[]) {
      this.emotionsBase = newEmotionsBase;
    },
    updateEmotionBase(emotionBase: EmotionBase) {
      const index = this.emotionsBase.findIndex(a => a.id === emotionBase.id);
      if (index !== -1) {
        this.emotionsBase[index] = emotionBase;
      }
    },
    removeEmotionBase(emotionBase: EmotionBase) {
      const index = this.emotionsBase.findIndex(a => a.id === emotionBase.id);
      if (index !== -1) {
        this.emotionsBase.splice(index, 1);
        this.emotions.filter(a => a.emotionBaseID !== emotionBase.id);
      }
    },
  },
});
