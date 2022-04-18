/**
 * qimm web
 *
 * app themes
 *
 * @author yayowd
 * @since 2022-04-05 12:18
 **/
import { computed, ref, watchEffect } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'

const type = ref(null)
const osTheme = useOsTheme()
watchEffect(() => (type.value = osTheme.value))
// const type = ref(null)
export const light = () => (type.value = 'light')
export const dark = () => (type.value = 'dark')
export const green = () => (type.value = 'green')
export const def = () => (type.value = null)
export const theme = computed(() => {
    switch (type.value) {
        case 'light':
            return null
        case 'dark':
            return darkTheme
        case 'green':
            return null
        default:
            return null
    }
})
export const themeOverrides = computed(() => {
    switch (type.value) {
        case 'light':
            return lightOverrides
        case 'dark':
            return darkOverrides
        case 'green':
            return greenOverrides
        default:
            return defaultOverrides
    }
})

const lightOverrides = {
    Layout: {
        color: '#f6f6f6',
    },
    Input: {
        color: 'rgba(255, 255, 255, 0.1)',
        colorFocus: 'rgba(99, 226, 183, 0.1)',
    },
}

const darkOverrides = {
    Layout: {
        color: '#393939',
    },
}

const greenOverrides = {
    common: {
        bodyColor: '#6bfac1',
    },
    Layout: {
        color: '#2aed9f',
        headerColor: '#6bfac1',
        footerColor: '#91dcbe',
    },
    Notification: {
        color: '#25d991',
    },
    Dialog: {
        color: '#25d991',
    },
    Popover: {
        color: '#86f8ca',
        dividerColor: 'rgb(211, 211, 251)',
        textColor: 'rgb(33, 34, 36)',
    },
    Input: {
        color: 'rgba(255, 255, 255, 0.1)',
        colorDisabled: 'rgba(255, 255, 255, 0.06)',
        colorFocus: 'rgba(99, 226, 183, 0.1)',
        colorFocusError: 'rgba(232, 128, 128, 0.1)',
        border: '1px solid #0003',
        placeholderColor: 'rgba(159, 159, 159, 0.9)',
    },
}

const defaultOverrides = {
    common: {
        bodyColor: '#fffbc9',
    },
    Layout: {
        color: '#fcf69e',
        headerColor: '#fffbc9',
        footerColor: '#f0ecb8',
    },
    Notification: {
        color: '#f9f4aa',
    },
    Dialog: {
        color: '#fbf59a',
    },
    Popover: {
        color: '#fcfecc',
        dividerColor: 'rgb(207, 207, 218)',
        textColor: 'rgb(33, 34, 36)',
    },
    Input: {
        color: 'rgba(255, 255, 255, 0.1)',
        colorDisabled: 'rgba(255, 255, 255, 0.06)',
        colorFocus: 'rgba(99, 226, 183, 0.1)',
        colorFocusError: 'rgba(232, 128, 128, 0.1)',
        border: '1px solid #0003',
        placeholderColor: 'rgba(199, 199, 199, 0.9)',
    },
}
