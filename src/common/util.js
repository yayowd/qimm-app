/**
 * qimm web
 *
 * common funcs
 *
 * @author yayowd
 * @since 2022-04-12 22:45
 **/
import * as R from 'ramda'

/* 输入框激活时文本全选 */
export const onFocusinSelAll = e => e.target?.select()

/* 判断一个字符串是否为空白，包括 null */
export const isBlankStr = str => R.isNil(str) || R.isEmpty(str.trim())
