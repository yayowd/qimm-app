<script setup>
import * as R from 'ramda'
import { computed, ref, watch, watchEffect } from 'vue'
import { NInputGroup, NInput, NButton, NIcon } from 'naive-ui'
import { NoteStore } from '@/note'
import { SearchStore } from '@/search'
import { createNote, openNode } from '@/note/note'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconFind from '@/components/icons/IconFind.vue'
import IconNote from '@/components/icons/IconNote.vue'
import GroupLister from '@/components/GroupLister.vue'
import WinLister from '@/components/WinLister.vue'
import NoteEditorView from '@/note/EditorView.vue'
import SearchView from '@/search/SearchView.vue'

const props = defineProps(['desk'])

/* note */
const noteStore = computed(() => NoteStore(props.desk))
const isNoteOpen = computed(() => !R.isEmpty(noteStore.value?.listOpened))
const onNoteAdd = () => {
    const note = createNote(props.desk, '')
    openNode(props.desk, note)
    onNoteOpen()
}
const onNoteOpen = () => searchStore.value.search()

/* search */
const searchStore = computed(() => SearchStore(props.desk)())
const keyword = ref('')
const searched = ref(false)
watchEffect(() => {
    keyword.value = searchStore.value.keyword
    searched.value = searchStore.value.searched
})
// 快速检索本地信息：笔记、页面和媒体等
const onFind = () => {
    searchStore.value.setKeyword(keyword.value)

    // todo 完成本地检索
    console.log(222, '快速检索本地信息：笔记、页面和媒体等', keyword.value)
}
watch(keyword, onFind)
// 搜索网络
const onSearch = () => {
    searchStore.value.search(keyword.value)

    console.log(222, '搜索网络：google、bing和baidu等', keyword.value)
}
const onClear = () => {
    console.log(222, '清空', keyword.value)
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
                :icon="IconNote"
                :listStore="noteStore"
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
                            v-model:value="keyword"
                            type="text"
                            size="small"
                            round
                            clearable
                            @keydown.enter="onSearch"
                            :on-clear="onClear"
                            placeholder="搜索笔记、页面、媒体和互联网">
                        </NInput>
                        <NButton
                            type="primary"
                            size="small"
                            round
                            ghost
                            @click="onSearch">
                            <template #icon>
                                <NIcon>
                                    <IconFind width="16" height="16"></IconFind>
                                </NIcon>
                            </template>
                        </NButton>
                    </NInputGroup>
                    <div>{{ keyword }}</div>
                </div>
                <div class="space">
                    <div
                        v-if="searched || isNoteOpen || isPageOpen"
                        class="notes-pages">
                        <SearchView
                            v-if="searched"
                            :searchStore="searchStore"></SearchView>
                        <WinLister
                            v-else-if="isNoteOpen"
                            :Component="NoteEditorView"
                            :data="{ desk }"
                            itemName="note"
                            :listStore="noteStore"></WinLister>
                        <div v-if="isPageOpen" class="pages">页面列表</div>
                    </div>
                    <div v-if="isMediaOpen" class="medias">媒体列表</div>
                    <div
                        v-if="
                            !(
                                searched ||
                                isNoteOpen ||
                                isPageOpen ||
                                isMediaOpen
                            )
                        "
                        class="tips">
                        <p>创建笔记</p>
                        <p>创建笔记</p>
                        <p>创建笔记</p>
                    </div>
                </div>
            </div>
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
