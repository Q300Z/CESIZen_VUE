// Utilities
import {defineStore} from 'pinia'
import {Role, type User} from '@/types';
import {useStorage} from '@vueuse/core';

const DEFAULT_USER: User = {
  id: 0,
  name: 'Anonymous',
  email: 'Veuillez vous connecter',
  role: Role.ANONYMOUS,
  created_at: '',
  updated_at: ''
}

export const useUserStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token', '' as User['token'] | null, localStorage),
    user: useStorage<User>('user', DEFAULT_USER, localStorage, {
      serializer: {
        read: (v: string): User => JSON.parse(v),
        write: (v: User): string => JSON.stringify(v),
      },
    }),
    users: useStorage('users', [] as User[], localStorage),
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user ? state.user.role === 'admin' : false,
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
    getUserById: (state) => state.users.find((user: User) => user.id === state.user?.id),
  },
  actions: {
    setUsers(users: User[]) {
      this.users = users
    },
    addUser(user: User) {
      this.users.push(user)
    },
    updateUser(user: User) {
      const index = this.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.users[index] = user
      }
    },
    removeUser(user: User) {
      const index = this.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.users.splice(index, 1)
      }
    },
    setUser(user: User) {
      this.user = user
    },
    setToken(token: User['token']) {
      this.token = token
    },
    logout() {
      this.token = null
      this.user = DEFAULT_USER
      window.localStorage.clear()
    }
  },
})
