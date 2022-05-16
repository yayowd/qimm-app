import { dataBase } from '@/common/app'
import { DeskStore } from '.'

/**
 * desk data
 **/
const deskData = (name, goal) => ({
    ...dataBase(name),
    goal,
})

const createDesk = (name, goal) => {
    const desk = deskData(name, goal)

    const { add } = DeskStore()
    add(desk)
    return desk
}

const editDesk = desk => {
    desk.mt = Date.now()

    const { modify } = DeskStore()
    modify(desk)
    return desk
}

export const saveDesk = desk => {
    if (desk.id) return editDesk(desk)

    const { name, goal } = desk
    return createDesk(name, goal)
}

export const deleteDesk = (desk, router) => {
    const { next, remove } = DeskStore()
    const nextDesk = next(desk)

    // todo 需要清理桌子上的所有内容

    remove(desk)

    if (nextDesk)
        router.push({ name: 'desk', params: { id: nextDesk.id }, force: true })
    else router.push({ path: '/' })
}
