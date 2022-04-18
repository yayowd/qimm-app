/**
 * qimm web
 *
 * net api
 *
 * @author yayowd
 * @since 2022-04-02 16:09
 **/
import axios from 'axios'

import { SERVER_URL_API } from '@/common/app'
import { authStore } from '@/auth/index.js'

export const net = axios.create({
    baseURL: SERVER_URL_API,
})

net.interceptors.request.use(config => {
    const { token } = authStore()
    // set to params not to headers to avoid options method when cors
    if (token) config.params = { ...config.params, token }
    //  config.headers.common['Authorization'] = token
    return config
})

net.interceptors.response.use(
    ({ headers: { token } = {}, data: { succ, data, msg } = {} }) => {
        // update token if necessary
        if (token) {
            const { saveToken } = authStore()
            saveToken(token)
        }

        if (succ) return data
        else throw new Error(msg)
    }
)
