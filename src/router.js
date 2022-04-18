import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes } from '@/auth'
import { deskRoutes } from '@/desk'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Prettier: allow multi-lines here
        ...authRoutes,
        ...deskRoutes,
    ],
})
