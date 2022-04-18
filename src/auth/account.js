/**
 * qimm web
 *
 * account regist, login, binding
 *
 * @author yayowd
 * @since 2022-04-03 21:54
 **/
import { authStore, authNet } from '.'

/**
 * initialize account
 *
 * NOTE: store(storeToRefs) must used after pinia installed
 **/
export const initAccount = async () => {
    const { token, saveUser } = authStore()
    let user = undefined
    if (token) {
        /**
         * get current user info
         *
         * NOTE: the user get by token
         **/
        user = await authNet.userinfo()
    } else {
        // register a new account for current browser
        user = await authNet.regist()
    }
    saveUser(user)
}
