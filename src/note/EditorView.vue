<script setup>
import * as R from 'ramda'
import { watchEffect, ref, onBeforeUnmount, nextTick } from 'vue'
import { NInput } from 'naive-ui'
import { saveNote, deleteNote } from './note'

const props = defineProps(['desk', 'note', 'focused'])

const refInput = ref(null)
// 监听焦点更新
watchEffect(() => {
    props.focused &&
        // 重要：下一个渲染周期再激活组件，避免导致不可控的 focusin 和 focusout 事件
        nextTick(() => {
            refInput.value?.focus()
            // refInput.value?.scrollIntoView()
        })
})

// form binds
const data = ref({
    text: null,
})
// 前一次保存过的数据，避免重复无效保存
let preText = null

// 监听数据更新
watchEffect(() => {
    const { desk, note } = props
    if (desk && note) {
        data.value = { ...note }
        preText = note.text
    }
})

// alt + s to save
const onAlt = e => {
    if (e.keyCode === 32) {
        onSave()
        e.preventDefault()
    }
}

// 保存数据
const onSave = () => {
    const { desk, note: { id } = {} } = props
    if (!desk) throw new Error('笔记须保存在桌子中')

    let { text = '' } = data.value
    text = text.trim()

    if (R.isEmpty(text)) {
        deleteNote(desk, { id })
        return
    }

    if (text === preText) return

    saveNote(desk, { id, text }, note => {
        const lines = R.split('\n', note.text || '')
        const line0 = lines[0]
        let lineName = line0

        // 分组
        if (R.startsWith('##', line0)) {
            const group = line0.slice(2).trim()
            if (!R.isEmpty(group)) note.group = group
            lineName = lines[1] || ''
        } else note.group = undefined

        // 名称
        if (R.startsWith('#', lineName)) {
            const name = lineName.slice(1).trim()
            if (!R.isEmpty(name)) note.name = name
        } else note.name = undefined
    })
    preText = text
}

// 自动保存
// fixme 由于 Teleport 在 disabled 状态下无法卸载子组件的问题，导致卸载事件不执行
//       在列表中仅存在一个 Teleport 时出现子组件不卸载的问题，多个 Teleport 时正常
//       等待 vue 版本更新
onBeforeUnmount(onSave)
</script>

<template>
    <NInput
        ref="refInput"
        class="input"
        v-model:value="data.text"
        :placeholder="`## group 分组，首行\n# name 名称，首行/第二行`"
        type="textarea"
        size="small"
        @focusout="onSave"
        @keydown.alt="onAlt"
        :autosize="{ minRows: 1 }"></NInput>
</template>

<style scoped>
.input {
    flex: 1;
    border-radius: 0;
    font-size: larger;
    padding: 9px;
}
</style>
