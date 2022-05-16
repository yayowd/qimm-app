<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { NRadioGroup, NRadioButton, NSpace, NTag } from 'naive-ui'
import IconClose from '@/components/icons/IconClose.vue'

const props = defineProps(['searchStore'])

const engins = [
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { name: 'Baidu', url: 'https://www.baidu.com/s?wd=' },
]

const searchList = ref([])
const engine = ref('')
watchEffect(() => {
    searchList.value = props.searchStore.searchList
    engine.value = props.searchStore.engine
})
watch(engine, () => props.searchStore.setEngine(engine.value))
const src = computed(() => {
    const [keyword] = searchList.value
    return keyword ? `${engine.value}${keyword}` : undefined
})

const onSearch = i => {
    if (i in searchList.value) props.searchStore.search(searchList.value[i])
}
const onDelete = i => props.searchStore.remove(i)
</script>

<template>
    <div class="page">
        <div class="actions">
            <NRadioGroup v-model:value="engine" size="small">
                <NRadioButton v-for="e in engins" :key="e.name" :value="e.url">
                    {{ e.name }}
                </NRadioButton>
            </NRadioGroup>
            <div class="history">
                <div
                    v-for="(s, i) in searchList"
                    :key="s"
                    class="history-item"
                    @click="onSearch(i)">
                    <span class="history-item-text">{{ s }}</span>
                    <IconClose
                        class="history-item-icon"
                        width="16"
                        height="16"
                        @click.stop="onDelete(i)"></IconClose>
                </div>
            </div>
        </div>
        <iframe class="content" :src="src"></iframe>
    </div>
</template>

<style scoped>
.page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.actions {
    display: flex;
    align-items: center;
    padding: 5px;
}
.history {
    margin-left: 19px;
    display: flex;
    overflow-x: auto;
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.history::-webkit-scrollbar {
    /* Hide scrollbar for Chrome, Safari and Opera */
    display: none;
}
.history-item {
    display: flex;
    align-items: center;
    max-width: 399px;
    min-width: 59px;
    margin: 0 9px;
    padding: 0 9px;
    border: 1px solid rgba(238, 238, 238, 0.66);
    border-radius: 14px;
    cursor: pointer;
    background-color: rgba(238, 187, 238, 0.067);
}
.history-item:first-child {
    background-color: rgba(238, 187, 238, 0.19);
    font-weight: bolder;
}
.history-item-text {
    flex: 1;
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
}
.history-item-icon {
    flex-shrink: 0;
}
.history-item-icon:hover {
    border: 1px rgba(238, 187, 238, 0.39) solid;
}
.content {
    flex: 1;
    border-left: none;
    border-right: none;
    border-top: 1px solid rgba(238, 238, 238, 0.66);
    border-bottom: 1px solid rgba(238, 238, 238, 0.66);
}
</style>
