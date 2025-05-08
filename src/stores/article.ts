// Utilities
import { defineStore } from 'pinia';
import { type Article } from '@/types';
import { useStorage } from '@vueuse/core';

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: useStorage("articles", [] as Article[], localStorage),
  }),

  getters: {
    getArticleById: (state) => {
      return (id: number) => state.articles.find((article: Article) => article.id === id);
    },
  },

  actions: {
    addArticle(article: Article) {
      this.articles.push(article);
    },

    setArticles(newArticles: Article[]) {
      this.articles = newArticles;
    },

    updateArticle(article: Article) {
      const index = this.articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        this.articles[index] = article;
      }
    },

    removeArticle(article: Article) {
      const index = this.articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        this.articles.splice(index, 1);
      }
    }
  },
});
