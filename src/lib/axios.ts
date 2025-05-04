import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://10.176.133.185:8000/api/' : 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  if (true) {
    config.headers.Authorization = `Bearer `
  }
  return config
})

export default api;
