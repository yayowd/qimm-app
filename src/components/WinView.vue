<script setup>
/**
 * 窗口组件
 *
 * 可以排列在 WinLister 窗口列表中
 * 也可最大化在 Workspace 工作区中
 **/
import { ref, computed, watchEffect, nextTick } from 'vue'
import { NPopconfirm, useThemeVars } from 'naive-ui'
import IconMaximize from '@/components/icons/IconMaximize.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconClose from '@/components/icons/IconClose.vue'

const themeVars = useThemeVars()

/**
 * Component    => 窗口中渲染的组件
 * data         => 传递到 Component 中去： 关联的数据，解包后传递
 * listStore    => 关联的数据列表商店
 **/
const props = defineProps(['Component', 'data', 'listStore'])

const item = computed(() => props.data.item)
const id = computed(() => item.value.id)
const group = computed(() => item.value.group)
const name = computed(() => item.value.name)
const focused = computed(() => id.value === props.listStore.focusId)

watchEffect(() => {
    // 先加载列表项的完整数据
    if (item.value.temp) props.listStore.findById(id.value)
})

const onFocus = focusId => props.listStore.focus(focusId)
const onFocusin = () => focused.value || onFocus(id.value)
const onFocusout = () => focused.value && onFocus()
const onEsc = () => (maxmize.value ? onMaximize() : onClose())

const maxmize = ref(false)
const onMaximize = () => {
    maxmize.value = !maxmize.value
    // 强制失去焦点
    props.listStore.blur()
    // 下一次渲染时再次获取焦点
    nextTick(onFocusin)
}
const onDelete = () => props.listStore.remove(item.value)
const onClose = () => props.listStore.close(item.value)
</script>

<template>
    <Teleport :disabled="!maxmize" to="body">
        <div
            class="win-view"
            :class="{ 'win-view-maxmize': maxmize }"
            :style="{
                backgroundColor: maxmize ? themeVars.bodyColor : null,
            }"
            @mouseenter="onFocusin"
            @focusin="onFocusin"
            @focusout="onFocusout"
            @keydown.enter.alt.exact="onMaximize"
            @keydown.esc.exact="onEsc">
            <div
                class="win-content"
                :class="{ 'win-content-maxmize': maxmize, focused }">
                <component
                    :is="Component"
                    v-bind="data"
                    :focused="focused"></component>
                <div class="caption">
                    <p class="name" v-if="group || name">
                        <span v-if="group">{{ group }} · </span>
                        <span v-if="name">{{ name }}</span>
                    </p>
                    <div class="actions">
                        <div class="action" title="最大化" @click="onMaximize">
                            <IconMaximize width="16" height="16"></IconMaximize>
                        </div>
                        <NPopconfirm
                            placement="bottom-end"
                            @positive-click="onDelete">
                            <template #trigger>
                                <div class="action" title="删除">
                                    <IconDelete
                                        width="16"
                                        height="16"></IconDelete>
                                </div>
                            </template>
                            <div>
                                确认删除此笔记？
                                <p>删除后数据将无法恢复！</p>
                            </div>
                        </NPopconfirm>
                        <div class="action" title="关闭" @click="onClose">
                            <IconClose width="16" height="16"></IconClose>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.win-view {
    flex: 1;
    display: flex;
    position: relative;
    margin: 5px 9px;
}
.win-view-maxmize {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
}
.win-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow-y: auto;
}
.win-content-maxmize {
    max-height: 100vh;
}
.focused {
    background-color: #c7edcc19;
}
.caption {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: rgba(199, 199, 199, 0.39);
    border-bottom-left-radius: 9px;
    text-align: center;
    padding: 3px 3px 3px 9px;
    opacity: 0.5;
}

.name {
    margin-right: 9px;
}
.actions {
    display: flex;
}
.action {
    cursor: pointer;
    padding: 3px;
}
</style>
