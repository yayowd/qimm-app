import { listStore } from '@/store/list'

export const NoteStore = desk => listStore(`note_${desk.id}`)()
