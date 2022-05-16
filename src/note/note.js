import { dataBase } from '@/common/app'
import { NoteStore } from '.'

/**
 * note data
 **/
const noteData = text => ({
    ...dataBase(),
    text,
})

export const createNote = (desk, text, onSave) => {
    const note = noteData(text)

    const { add } = NoteStore(desk)
    add(note, onSave)
    return note
}

export const editNote = (desk, note, onSave) => {
    note.mt = Date.now()

    const { modify } = NoteStore(desk)
    modify(note, onSave)
    return note
}

export const saveNote = (desk, note, onSave) => {
    if (note.id) return editNote(desk, note, onSave)

    const { text } = note
    return createNote(desk, text, onSave)
}

export const deleteNote = (desk, note) => {
    const { remove } = NoteStore(desk)
    remove(note)
}

export const openNode = (desk, note) => {
    const { open } = NoteStore(desk)
    open(note)
}
