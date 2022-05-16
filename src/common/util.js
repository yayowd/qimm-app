/**
 * qimm web
 *
 * common funcs
 *
 * @author yayowd
 * @since 2022-04-12 22:45
 **/
import * as R from 'ramda'
import { format, isSameYear, isSameMonth, isSameDay } from 'date-fns'

/* 输入框激活时文本全选 */
export const onFocusinSelAll = e => e.target?.select()

/* 判断一个字符串是否为空白，包括 null */
export const isBlankStr = str => R.isNil(str) || R.isEmpty(str.trim())

/* 获取文本的前n行 */
export const subLines = (text, n) => {
    const lines = R.split('\n', text)
    if (R.length(lines) <= n) return text
    else return R.compose(R.join('\n'), R.append('.....'), R.slice(0, n))(lines)
}

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
