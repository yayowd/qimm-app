import { defineStore } from 'pinia'
import { net } from '@/net'
import AccountView from './AccountView.vue'

export const authRoutes = [
    {
        path: '/',
        name: 'account',
        component: AccountView,
    },
]

export const authNet = {
    regist: async () => {
        return await net.get('auth/register')
    },
    userinfo: async () => {
        return await net.get('auth/userinfo')
    },
}

export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        // token: '123123123',
        token: localStorage.token,
        user: undefined,
    }),
    getters: {
        mytoken: state => state.token + 'my',
        myname: state => haha => `${haha} - ${state.name}: ${state.counter}`,
    },
    actions: {
        saveToken(token) {
            localStorage.token = token

            this.token = token
        },
        saveUser(user) {
            this.user = user
        },
    },
})
