import axios from 'axios'
import {useUserStore} from "@/stores/user.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //baseURL: "https://cesizen-api.qalpuch.cc/v1",
  headers: {
    'Content-Type': 'application/json'
  },
})

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const store = useUserStore()
  if (store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }
  return config
})

export default api;
