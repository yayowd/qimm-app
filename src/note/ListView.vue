<script setup>
import * as R from 'ramda'
import { ref, watch, watchEffect, computed } from 'vue'
import { NPopover, useThemeVars } from 'naive-ui'
import { format } from 'date-fns'
import { noteStore } from '.'
import { createNote } from './note'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconNote from '@/components/icons/IconNote.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { dateFormNow, dayFormNow } from '@/common/app'

const props = defineProps(['desk', 'focusId'])
const themeVars = useThemeVars()

const emit = defineEmits(['openNote'])
const openNote = note => emit('openNote', note)

const onNoteAdd = async () => {
    const note = createNote(props.desk, '')
    openNote(note)
}
const onNoteEnter = note => {
    if (note.temp) {
        const { findById } = noteStore(props.desk)
        findById(note.id)
    }
}

const isNoteFocused = note => note.id === props.focusId

const groupList = ref(null)
const groupState = ref({})
watchEffect(() => {
    groupList.value = R.groupBy(
        R.propOr('未分组', 'group'),
        noteStore(props.desk).list
    )
    groupState.value = {
        ...R.map(() => true, groupList.value), // 默认全部展开
        ...groupState.value,
    }
})
watch(
    () => props.desk,
    () => (groupState.value = {}) // 切换桌子时清空分组状态
)
const groups = computed(() => R.keys(groupList.value))
const isGroupOpened = group => groupState.value[group]
const toggleGroupOpened = group =>
    (groupState.value[group] = !groupState.value[group])

const title = note => {
    const { name, ct } = note
    if (name) return name
    if (ct) return format(ct, 'HH:mm')
    return '无标题'
}
const subtitle = note => {
    const { name, ct } = note
    if (ct) {
        if (name) return dateFormNow(ct)
        return dayFormNow(ct)
    }
}
</script>

<template>
    <div class="list">
        <div class="action adder" @click="onNoteAdd" title="添加笔记">
            <IconAdd width="16" height="16"></IconAdd>笔记
        </div>
        <div v-for="group in groups" :key="group">
            <div class="group" @click="toggleGroupOpened(group)">
                <p class="group-text">{{ group }}</p>
                <IconArrowRight
                    class="group-arrow"
                    :class="{ 'group-arrow-opened': isGroupOpened(group) }"
                    width="12"
                    height="12"></IconArrowRight>
            </div>
            <template v-if="isGroupOpened(group)">
                <NPopover
                    v-for="note in groupList[group]"
                    :key="note.id"
                    :delay="300"
                    style="min-width: 200px; max-width: 600px"
                    placement="right-start"
                    trigger="hover">
                    <template #trigger>
                        <div
                            class="action note"
                            :class="{ focused: isNoteFocused(note) }"
                            @mouseenter="onNoteEnter(note)"
                            @click="openNote(note)">
                            <IconNote
                                class="icon"
                                width="16"
                                height="16"></IconNote>
                            <div class="text">
                                <p class="title">{{ title(note) }}</p>
                                <p class="subtitle">{{ subtitle(note) }}</p>
                            </div>
                        </div>
                    </template>
                    <p style="white-space: pre-wrap; word-break: break-all">
                        {{ note.text }}
                    </p>
                </NPopover>
            </template>
        </div>
    </div>
</template>

<style scoped>
.list {
    width: 90px;
    border-right: 1px rgba(191, 191, 191, 0.28) solid;
    overflow-y: auto;
}
.group {
    padding: 2px 2px 2px 5px;
    background-color: #8881;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.group-text {
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
}
.group-arrow {
    flex-shrink: 0;
}
.group-arrow-opened {
    transform: rotate(90deg);
}
.action {
    padding: 5px;
    display: flex;
    font-size: 12px;
    line-height: 1.2;
    cursor: pointer;
}
.action:hover {
    background-color: #98d9a18e;
}
.adder {
    margin: 9px 0;
}
.note {
    margin: 5px 0;
}
.focused {
    background-color: #d1d19a8e;
}
.icon {
    flex-shrink: 0;
}
.text {
    margin-left: 2px;
    overflow: hidden;
}
.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.subtitle {
    margin-top: 2px;
    color: v-bind('themeVars.textColor3');
}
</style>
