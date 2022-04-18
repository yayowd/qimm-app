<script setup>
/**
 * 窗口列表组件
 **/
import * as R from 'ramda'
import { computed } from 'vue'
import WinView from './WinView.vue'

/**
 * Component    => 传递到 WinView 中去： 窗口中渲染的组件
 * data         => 传递到 WinView 中去： 关联的数据，和单个数据项一起传递
 * itemName     => 传递到 WinView 中去： 列表中单个数据项传递时的名称
 * list         => 需要显示的数据列表
 * focusId      => 传递到 WinView 中去： 需要获取焦点的窗口关联数据项 id
 **/
const props = defineProps(['Component', 'data', 'itemName', 'list', 'focusId'])

const emit = defineEmits(['update:focusId', 'close'])
// v-model support
const updateFocusId = focusId => emit('update:focusId', focusId)
// event: close
const close = data => emit('close', data)

const focusId_ = computed({
    get() {
        return props.focusId
    },
    set(value) {
        updateFocusId(value)
    },
})

const onClose = data => close(data)
</script>

<template>
    <div class="win-lister">
        <WinView
            :Component="Component"
            v-for="item in list"
            :key="item.id"
            :data="{
                ...data,
                itemName,
                [itemName]: item,
                item, // 方便内部使用
            }"
            v-model:focusId="focusId_"
            @close="onClose"></WinView>
    </div>
</template>

<style scoped>
.win-lister {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
</style>
