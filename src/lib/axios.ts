import axios from 'axios'
import {useUserStore} from "@/stores/user.ts";

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://10.176.133.185:8080/v1' : 'http://localhost:8080/v1',
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
