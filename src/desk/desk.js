import { dataBase, dataState } from '@/common/app'
import { deskStore } from '.'

/**
 * desk data
 **/
const deskData = (name, goal) => ({
    ...dataBase(name),
    ...dataState(),
    goal,
})

const createDesk = (name, goal) => {
    const desk = deskData(name, goal)

    const { add } = deskStore()
    add(desk)
    return desk
}

const editDesk = desk => {
    desk.mt = Date.now()

    const { modify } = deskStore()
    modify(desk)
    return desk
}

export const saveDesk = desk => {
    if (desk.id) return editDesk(desk)

    const { name, goal } = desk
    return createDesk(name, goal)
}

export const deleteDesk = (desk, router) => {
    const { next, remove } = deskStore()
    const nextDesk = next(desk)

    remove(desk)

    if (nextDesk)
        router.push({ name: 'desk', params: { id: nextDesk.id }, force: true })
    else router.push({ path: '/' })
}
