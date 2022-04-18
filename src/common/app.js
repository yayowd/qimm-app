/**
 * qimm web
 *
 * app data and funcs
 *
 * @author yayowd
 * @since 2022-04-13 19:10
 **/
import { format, isSameYear, isSameMonth, isSameDay } from 'date-fns'

/* url for server api */
export const SERVER_URL_API = 'http://127.0.0.1:3000'

/* base data struct */
export const dataBase = (name, group) => ({
    id: window.crypto.randomUUID(), // 编号
    pos: undefined, // sort position
    ct: Date.now(), // create time
    mt: undefined, // modify time
    temp: undefined, // 列表临时数据，完整数据还需再次加载
    name, // 名称
    group, // 分组
})

/* data state struct, for data open */
export const dataState = () => ({
    ot: undefined, // open time
})

/* 获取可读的日期：包括时分 */
export const dateFormNow = date => {
    const now = Date.now()
    if (isSameDay(date, now)) return format(date, 'HH:mm')
    if (isSameMonth(date, now)) return format(date, 'dd HH:mm')
    if (isSameYear(date, now)) return format(date, 'MM-dd')
    return format(date, 'yyyy-MM-dd')
}

/* 获取可读的日期 */
export const dayFormNow = date => {
    const now = Date.now()
    if (isSameDay(date, now)) return 'today'
    if (isSameMonth(date, now)) return format(date, 'MM-dd')
    return format(date, 'yyyy-MM-dd')
}
