<script setup>
/**
 * 分组列表组件
 **/
import * as R from 'ramda'
import { ref, watch, watchEffect, computed } from 'vue'
import { NPopover, useThemeVars } from 'naive-ui'
import { format } from 'date-fns'
import { dateFormNow, dayFormNow } from '@/common/app'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const themeVars = useThemeVars()

/**
 * owner        => 本列表的所有者，用于清除分组折叠状态
 * icon         => 数据项业图标，用于显示在列表项上
 * list         => 需要显示的数据列表
 * findById     => 获取数据项的完整数据
 * focusId      => 当前焦点关联数据项 id
 **/
const props = defineProps(['owner', 'icon', 'list', 'findById', 'focusId'])

/**
 * open         => 打开某个数据项，参数：item
 **/
const emit = defineEmits(['open'])

const focused = item => item.id === props.focusId
const onEnter = item => item.temp && props.findById(item.id)
const onOpen = item => emit('open', item)

const groupList = ref(null)
const groupState = ref({})
watchEffect(() => {
    // 按照 group 属性获取分组
    groupList.value = R.groupBy(R.propOr('未分组', 'group'), props.list)
    groupState.value = {
        // 默认全部展开
        ...R.map(() => true, groupList.value),
        // 恢复当前折叠状态，因为 list 属性会在数据项新建、删除和编辑时多次更新
        ...groupState.value,
    }
})
watch(
    () => props.owner, // 切换所有者时
    () => (groupState.value = {}) // 清空分组状态
)
const isEmpty = computed(() => R.isEmpty(groupList.value))
const groups = computed(() => R.keys(groupList.value))
const isGroupOpened = group => groupState.value[group]
const toggleGroupOpened = group =>
    (groupState.value[group] = !groupState.value[group])

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
                    v-for="item in groupList[group]"
                    :key="item.id"
                    :delay="300"
                    style="min-width: 200px; max-width: 600px"
                    placement="right-start"
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
                        <p style="white-space: pre-wrap; word-break: break-all">
                            {{ item.text }}
                        </p>
                    </slot>
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
    background-color: rgba(209, 193, 193, 0.265);
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
.item {
    margin: 5px 0;
    padding: 5px;
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
    overflow: hidden;
    text-overflow: ellipsis;
}
.subtitle {
    margin-top: 2px;
    color: v-bind('themeVars.textColor3');
}
</style>
