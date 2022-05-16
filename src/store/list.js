import * as R from 'ramda'
import { defineStore } from 'pinia'
import { stList } from './storage'
import { nextTick } from 'vue'

/**
 * 创建数据商店： 列表商店
 *
 * 支持：
 *   1、列表： 存储简单对象，延迟加载完整数据
 *   2、对象： 主键 => id
 *            排序 => group分组正序、pos位置正序、ct创建时间倒序
 *            检查 => name名称重复
 *   3、激活： 当前激活对象 id  => focusId
 **/
export const listStore = id => {
    // 存储数据
    const stData = stList(`list_${id}`)
    return defineStore({
        id,
        state: () => ({
            // 列表数据 使用 data.id 为 key 使用 data 为 value
            // 初始只是简单列表，避免启动时一次性加载全部数据
            //   使用 findById 加载完整数据
            datas: stData.list || {},
            // 已打开列表 使用 data.id 为 key 使用 ot 为 value
            opened: stData.opened || {},
            // 激活项 id
            focusId: stData.focusId,
        }),
        getters: {
            count: state => R.compose(R.length, R.keys)(state.datas),
            list: state =>
                // 默认排序：group分组正序、pos位置正序、ct创建时间倒序
                R.compose(
                    R.sort((a, b) =>
                        a.group === b.group && a.pos === b.pos ? b.ct - a.ct : 0
                    ),
                    R.sort((a, b) => (a.group === b.group ? a.pos - b.pos : 0)),
                    R.sort(({ group: group1 = '' }, { group: group2 = '' }) =>
                        group1.localeCompare(group2)
                    ),
                    R.values
                )(state.datas),
            listOpened: state =>
                // 默认排序：ot打开时间倒序
                R.compose(
                    R.map(id => state.datas[id]),
                    R.sort((a, b) => state.opened[b] - state.opened[a]),
                    R.keys
                )(state.opened),
            // 下一个，如果后面没有就取前面的
            next() {
                return data => {
                    const len = R.length(this.list)
                    let pos =
                        R.findIndex(R.propEq('id', data.id), this.list) + 1
                    if (pos >= len) pos -= 2
                    if (pos >= 0 && pos <= len - 1) return this.list[pos]
                }
            },
            findById: state => id => {
                let data = state.datas[id]
                // 如果只是列表中的临时对象
                if (data && data.temp) {
                    // 加载完整数据并更新到 state 中
                    const dataNew = stData.load(id)
                    if (dataNew) {
                        state.datas[id] = dataNew
                        // 重新获取响应式对象
                        data = state.datas[id]
                    } else throw new Error('数据不存在，或许已被删除')
                }
                return data
            },
            exsitName: state => name =>
                R.compose(
                    R.not,
                    R.isNil,
                    R.find(R.propEq('name', name)),
                    R.values
                )(state.datas),
            /**
             * for storage
             **/
            // 生成简单列表用于保存
            listToSave: state =>
                R.map(({ id, group, name, ct }) => ({
                    id,
                    group,
                    name,
                    ct,
                    temp: true, // 标志使用时需要再次完整加载
                }))(state.datas),
        },
        actions: {
            save(data, onSave) {
                // 保存时先执行自定义操作
                if (onSave instanceof Function) onSave(data)

                // 同步数据到数据商店
                this.datas[data.id] = data

                // 更新列表
                stData.list = this.listToSave
                // 保存数据
                stData.save(data)
            },
            add(data, onSave) {
                // 新建时，检查ID是否存在
                if (R.has(data.id, this.datas))
                    throw new Error(`the data(id:${data.id}) already exist`)

                this.save(data, onSave)
            },
            modify(data, onSave) {
                // 编辑时，检查ID是否存在
                if (!R.has(data.id, this.datas))
                    throw new Error(`the data(id:${data.id}) does not exist`)

                // 将新数据合并到原数据中
                data = R.mergeDeepRight(this.datas[data.id], data)

                this.save(data, onSave)
            },
            remove(data) {
                delete this.datas[data.id]

                // 更新列表
                stData.list = this.listToSave
                // 删除数据
                stData.remove(data)

                this.close(data)
            },
            open(data) {
                // 没打开的话，先打开
                if (!this.opened[data.id]) {
                    this.opened[data.id] = Date.now() // 打开时间
                    stData.opened = this.opened
                }
                // 激活
                this.blur()
                nextTick(() => this.focus(data.id))
            },
            close(data) {
                // 已经打开的话，先关闭
                if (this.opened[data.id]) {
                    delete this.opened[data.id]
                    stData.opened = this.opened
                }
                // 失活
                this.blur() // 注意区别 WinView 的 focusout
            },
            focus(id) {
                // 由于刷新页面时，总是触发当前激活组件的失活事件
                //   导致页面重新加载时总是获取空的焦点项
                //   所以不储存空的焦点项，会出现重新加载页面时仍然激活上一次主动失活的焦点项
                if (id && this.focusId !== id) {
                    this.focusId = id
                    stData.focusId = id
                }
            },
            blur() {
                // 强制清除当前焦点项
                this.focus(-1)
            },
        },
    })
}
