import { listStore } from '@/store/list'

export const noteStore = desk => listStore(`note_${desk.id}`)()
