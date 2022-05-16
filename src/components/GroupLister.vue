<script setup>
/**
 * 分组列表组件
 **/
import * as R from 'ramda'
import { ref, watch, computed } from 'vue'
import { NPopover, useThemeVars } from 'naive-ui'
import { format } from 'date-fns'
import { dateFormNow, dayFormNow } from '@/common/util'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const themeVars = useThemeVars()

/**
 * icon         => 数据项业图标，用于显示在列表项上
 * listStore    => 关联的数据列表商店
 **/
const props = defineProps(['icon', 'listStore'])

const emit = defineEmits(['open'])
const open = item => emit('open', item)

const groupList = computed(() =>
    // 按照 group 属性获取分组
    R.groupBy(R.propOr('未分组', 'group'), props.listStore.list)
)
const groupState = ref({}) // 默认全部展开
watch(
    () => props.listStore, // 切换列表数据商店时
    () => (groupState.value = {}) // 清空分组状态
)
const isEmpty = computed(() => R.isEmpty(groupList.value))
const groups = computed(() => R.keys(groupList.value))
const isFold = group => group in groupState.value
const toggleFold = group =>
    isFold(group)
        ? delete groupState.value[group] // 展开
        : (groupState.value[group] = undefined) // 折叠

// 函数执行时，每次获取 props.listStore 中的最新值
const focused = item => item.id === props.listStore.focusId
const onEnter = item => item.temp && props.listStore.findById(item.id)
const onOpen = item => {
    props.listStore.open(item)
    open(item)
}

const title = item => {
    const { name, ct } = item
    if (name) return name
    if (ct) return format(ct, 'HH:mm')
    return '无标题'
}
const subtitle = item => {
    const { name, ct } = item
    if (ct) {
        if (name) return dateFormNow(ct)
        return dayFormNow(ct)
    }
}
</script>

<template>
    <div class="list" v-if="!isEmpty">
        <div v-for="group in groups" :key="group">
            <div class="group" @click="toggleFold(group)">
                <p class="group-text">{{ group }}</p>
                <IconArrowRight
                    class="group-arrow"
                    :class="{ 'group-arrow-expand': !isFold(group) }"
                    width="12"
                    height="12"></IconArrowRight>
            </div>
            <template v-if="!isFold(group)">
                <NPopover
                    v-for="item in groupList[group]"
                    :key="item.id"
                    :delay="300"
                    style="min-width: 200px; max-width: 600px"
                    placement="right"
                    trigger="hover">
                    <template #trigger>
                        <div
                            class="item"
                            :class="{ focused: focused(item) }"
                            @mouseenter="onEnter(item)"
                            @click="onOpen(item)">
                            <component
                                :is="icon"
                                class="icon"
                                width="16"
                                height="16"></component>
                            <div class="text">
                                <p class="title">{{ title(item) }}</p>
                                <p class="subtitle">{{ subtitle(item) }}</p>
                            </div>
                        </div>
                    </template>
                    <slot name="popover">
                        <div
                            style="
                                display: -webkit-box;
                                -webkit-line-clamp: 9;
                                -webkit-box-orient: vertical;
                                white-space: pre-wrap;
                                word-wrap: break-word;
                                word-break: break-all;
                                overflow: hidden;
                                text-overflow: 'haah';
                                max-height: 590px;
                            ">
                            {{ item.text }}
                        </div>
                    </slot>
                </NPopover>
            </template>
        </div>
    </div>
</template>

<style scoped>
.list {
    width: 105px;
    border-right: 1px rgba(191, 191, 191, 0.28) solid;
    overflow-y: auto;
}
.group {
    padding: 2px 2px 2px 5px;
    background-color: rgba(209, 193, 193, 0.265);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.group-text {
    white-space: pre;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.group-arrow {
    flex-shrink: 0;
}
.group-arrow-expand {
    transform: rotate(90deg);
}
.item {
    margin-top: 1px;
    padding: 9px 5px;
    display: flex;
    font-size: 12px;
    line-height: 1.2;
    cursor: pointer;
}
.item:hover {
    background-color: #98d9a18e;
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
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.subtitle {
    margin-top: 2px;
    color: v-bind('themeVars.textColor3');
}
</style>
