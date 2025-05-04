// Utilities
import {defineStore} from 'pinia'
import type {User} from '@/types';
import {useStorage} from '@vueuse/core';
import axios from "@/lib/axios.ts";

export const useUserStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token', '' as User['token'] | null, localStorage),
    validity: useStorage('validity', null as Date | null, localStorage),
    user: useStorage<User | null>('user', null, localStorage, {
      serializer: {
        read: (v: string):User|null => JSON.parse(v),
        write: (v: User | null):string => JSON.stringify(v),
      },
    }),
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user ? state.user.role === 'admin' : false,
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: User['token']) {
      this.token = token
    }
  },
})
