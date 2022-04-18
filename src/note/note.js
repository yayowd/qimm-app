import { dataBase, dataState } from '@/common/app'
import { noteStore } from '.'

/**
 * note data
 **/
const noteData = text => ({
    ...dataBase(),
    ...dataState(),
    text,
})

export const createNote = (desk, text, onSave) => {
    const note = noteData(text)

    const { add } = noteStore(desk)
    add(note, onSave)
    return note
}

export const editNote = (desk, note, onSave) => {
    note.mt = Date.now()

    const { modify } = noteStore(desk)
    modify(note, onSave)
    return note
}

export const saveNote = (desk, note, onSave) => {
    if (note.id) return editNote(desk, note, onSave)

    const { text } = note
    return createNote(desk, text, onSave)
}

export const deleteNote = (desk, note) => {
    const { remove } = noteStore(desk)
    remove(note)
}

export const openNode = (desk, note) => {
    const { open } = noteStore(desk)
    open(note)
}
