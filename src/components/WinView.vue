<script setup>
/**
 * 窗口组件
 *
 * 可以排列在 WinLister 窗口列表中
 * 也可最大化在 Workspace 工作区中
 **/
import { ref, computed, watchEffect } from 'vue'

/**
 * Component    => 窗口中渲染的组件
 * data         => 传递到 Component 中去： 关联的数据，解包后传递
 * focusId      => 需要获取焦点的关联数据项 id
 **/
const props = defineProps(['Component', 'data', 'focusId'])

const emit = defineEmits(['update:focusId', 'close'])
// v-model support
const updateFocusId = focusId => emit('update:focusId', focusId)
// event: close
const close = () => {
    onFocusout()
    emit('close', props.data)
}

const id = computed(() => props.data.item.id)
const focused = computed(() => id.value === props.focusId)
const onFocusout = () => focused.value && updateFocusId()

const name = ref(null)
watchEffect(() => (name.value = props.data.item.name))
</script>

<template>
    <div
        class="win-view"
        :class="{ focused }"
        @mouseenter="focused || updateFocusId(id)"
        @focusout="onFocusout"
        @keydown.esc.exact="close">
        <component :is="Component" v-bind="data" :focused="focused"></component>
        <div class="caption">
            <div class="actions">xxxx</div>
            <p class="name">{{ name }}</p>
        </div>
    </div>
</template>

<style scoped>
.win-view {
    flex: 1;
    margin: 15px 19px;
    display: flex;
    flex-direction: column;
    position: relative;
}
.focused {
    background-color: #fcbeff2d;
}
.caption {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    border-bottom: 1px rgba(204, 204, 204, 0.251) solid;
    border-left: 1px rgba(204, 204, 204, 0.251) solid;
    padding: 2px 9px;
}
.actions {
    float: left;
}
</style>
