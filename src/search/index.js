import { defineStore } from 'pinia'
import { stSearch } from '@/store/storage'
import { isBlankStr } from '@/common/util'

export const SearchStore = desk => {
    // 存储数据
    const stData = stSearch(desk.id)
    return defineStore({
        id: `search_${desk.id}`,
        state: () => ({
            keyword: stData.keyword || '',
            searched: stData.searched,
            searchList: stData.searchList,
            engine: stData.engine,
        }),
        actions: {
            setKeyword(keyword) {
                stData.keyword = this.keyword = keyword
            },
            search(keyword) {
                if (keyword === undefined) {
                    stData.searched = this.searched = false
                } else {
                    const list = this.searchList
                    if (isBlankStr(keyword)) {
                        if (list.length === 0) return
                    } else {
                        const index = list.indexOf(keyword)
                        if (index > 0) list.splice(index, 1)
                        if (index !== 0)
                            stData.searchList = this.searchList = [
                                keyword,
                                ...list,
                            ]
                    }
                    stData.searched = this.searched = true
                }
            },
            remove(index) {
                const list = this.searchList
                if (index in list) {
                    list.splice(index, 1)
                    stData.searchList = this.searchList = list
                }
            },
            setEngine(engine) {
                stData.engine = this.engine = engine
            },
        },
    })
}
