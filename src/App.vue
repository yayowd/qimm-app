<script setup>
import { onErrorCaptured } from 'vue'
import { NConfigProvider, NGlobalStyle, zhCN, dateZhCN } from 'naive-ui'
import {
    NDialogProvider,
    NMessageProvider,
    NNotificationProvider,
} from 'naive-ui'
import { NButton } from 'naive-ui'
import { theme, themeOverrides, light, dark, green, def } from '@/common/theme'
import MainView from '@/index/MainView.vue'

// eslint-disable-next-line no-unused-vars
onErrorCaptured((err, node, info) => {
    console.log('App', err)

    // window.$notify setup at MainView
    window.$notify.error({
        content: err.message || err,
        meta: 'error to notice',
        duration: 9e3,
        closable: false,
    })
    // did not pop out
    return false
})
</script>

<template>
    <NConfigProvider
        class="config"
        :theme="theme"
        :theme-overrides="themeOverrides"
        :locale="zhCN"
        :date-locale="dateZhCN">
        <NDialogProvider>
            <NMessageProvider>
                <NNotificationProvider>
                    <MainView></MainView>
                    <div>
                        <NButton @click="light">light</NButton>
                        <NButton @click="dark">dark</NButton>
                        <NButton @click="green">green</NButton>
                        <NButton @click="def">default</NButton>
                    </div>
                </NNotificationProvider>
            </NMessageProvider>
        </NDialogProvider>
        <NGlobalStyle></NGlobalStyle>
    </NConfigProvider>
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/naiveui.css';

.config {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
