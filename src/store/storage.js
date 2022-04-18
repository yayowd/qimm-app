/**
 * qimm web
 *
 * local data funcs
 *
 * @author yayowd
 * @since 2022-04-06 12:48
 **/

/**
 * local storage: common funcs
 **/
export const storage = {
    load(name) {
        const value = localStorage.getItem(name)
        if (value) return JSON.parse(value)
    },
    save(name, value) {
        localStorage.setItem(name, JSON.stringify(value))
    },
    remove(name) {
        localStorage.removeItem(name)
    },
}

/**
 * local storage: list
 **/
export const stList = name => ({
    get list() {
        return storage.load(name) || []
    },
    set list(value) {
        storage.save(name, value)
    },
    get focusId() {
        return storage.load(`${name}_focusid`) || []
    },
    set focusId(value) {
        storage.save(`${name}_focusid`, value)
    },
    load(id) {
        return storage.load(id)
    },
    save(data) {
        storage.save(data.id, data)
    },
    remove(data) {
        storage.remove(data.id)
    },
})
