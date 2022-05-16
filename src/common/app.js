/**
 * qimm web
 *
 * app data and funcs
 *
 * @author yayowd
 * @since 2022-04-13 19:10
 **/

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
