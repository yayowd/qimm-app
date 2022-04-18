import DeskView from './DeskView.vue'
import { listStore } from '@/store/list'

export const deskRoutes = [
    {
        name: 'desk',
        path: '/desk/:id',
        component: DeskView,
        props: true,
    },
]

export const deskStore = listStore('desk')
