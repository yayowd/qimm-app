<script setup>
import * as R from 'ramda'
import { computed, ref, watchEffect } from 'vue'
import { NInputGroup, NInput, NButton, NIcon } from 'naive-ui'
import { noteStore } from '@/note'
import { createNote, openNode } from '@/note/note'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconFind from '@/components/icons/IconFind.vue'
import IconNote from '@/components/icons/IconNote.vue'
import GroupLister from '@/components/GroupLister.vue'
import WinLister from '@/components/WinLister.vue'
import NoteEditorView from '@/note/EditorView.vue'

const props = defineProps(['desk'])

/* note */
const noteList = ref(null)
const noteFindById = ref(null)
const noteListOpened = ref(null)
const noteFocusId = ref(null)
watchEffect(() => {
    const { list, findById, listOpened, focusId } = noteStore(props.desk)
    noteList.value = list
    noteFindById.value = findById
    noteListOpened.value = listOpened
    noteFocusId.value = focusId
})
const noteFocusId_ = computed({
    get() {
        return noteFocusId.value
    },
    set(value) {
        const { focus } = noteStore(props.desk)
        focus(value)
    },
})
const isNoteOpen = computed(() => !R.isEmpty(noteListOpened.value))
const onNoteAdd = () => {
    const note = createNote(props.desk, '')
    onNoteOpen(note)
}
const onNoteOpen = note => {
    openNode(props.desk, note)
}

const openPages = ref({})
const openMedias = ref({})

const isPageOpen = computed(() => !R.isEmpty(openPages.value))
const isMediaOpen = computed(() => !R.isEmpty(openMedias.value))
</script>

<template>
    <div class="workspace">
        <div class="content">
            <GroupLister
                :owner="desk"
                :icon="IconNote"
                :list="noteList"
                :findById="noteFindById"
                :focusId="noteFocusId_"
                @open="onNoteOpen"></GroupLister>
            <div class="work">
                <div class="actions">
                    <div>
                        <NButton
                            class="action"
                            size="small"
                            ghost
                            @click="onNoteAdd">
                            <template #icon>
                                <NIcon>
                                    <IconAdd width="16" height="16"></IconAdd>
                                </NIcon> </template
                            >笔记
                        </NButton>
                    </div>
                    <NInputGroup class="serchbar">
                        <NInput
                            type="text"
                            size="small"
                            round
                            placeholder="搜索笔记、页面、媒体和互联网">
                        </NInput>
                        <NButton type="primary" size="small" round ghost>
                            <template #icon>
                                <NIcon>
                                    <IconFind width="16" height="16"></IconFind>
                                </NIcon>
                            </template>
                        </NButton>
                    </NInputGroup>
                    <div></div>
                </div>
                <div class="space">
                    <div v-if="isNoteOpen || isPageOpen" class="notes-pages">
                        <WinLister
                            v-if="isNoteOpen"
                            :Component="NoteEditorView"
                            :data="{ desk }"
                            itemName="note"
                            v-model:list="noteListOpened"
                            v-model:focusId="noteFocusId_"></WinLister>
                        <div v-if="isPageOpen" class="pages">页面列表</div>
                    </div>
                    <div v-if="isMediaOpen" class="medias">媒体列表</div>
                    <div
                        v-if="!(isNoteOpen || isPageOpen || isMediaOpen)"
                        class="tips">
                        <p>创建笔记</p>
                        <p>创建笔记</p>
                        <p>创建笔记</p>
                    </div>
                </div>
            </div>
            <GroupLister
                :owner="desk"
                name="页面"
                :itemIcon="IconNote"
                :list="noteList"
                :focusId="noteFocusId"
                :findById="noteFindById"
                @add="onNoteAdd"
                @open="onNoteOpen">
                <template #popover>haha</template>
            </GroupLister>
        </div>
        <div class="media-list">媒体</div>
    </div>
</template>

<style scoped>
.workspace {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.content {
    flex: 1;
    display: flex;
    overflow: hidden;
}
.work {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.actions {
    display: flex;
    justify-content: space-between;
    padding: 9px;
}
.action {
    padding: 5px;
    display: flex;
    font-size: 12px;
    line-height: 1.2;
    cursor: pointer;
}
.serchbar {
    width: 50%;
    min-width: 300px;
}
.space {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.notes-pages {
    flex: 1;
    display: flex;
    overflow: hidden;
}
.pages {
    flex: 1;
    overflow-y: auto;
}
.medias {
    flex: 1;
    overflow-y: auto;
}
.tips {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.media-list {
}
</style>
