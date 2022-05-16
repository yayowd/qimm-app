<script setup>
/**
 * 窗口列表组件
 **/
import WinView from './WinView.vue'

/**
 * Component    => 传递到 WinView 中去： 窗口中渲染的组件
 * data         => 传递到 WinView 中去： 关联的数据，和单个数据项一起传递
 * itemName     => 传递到 WinView 中去： 列表中单个数据项传递时的名称
 * listStore    => 关联的数据列表商店，获取打开的数据项列表
 *                 传递到 WinView 中去
 **/
defineProps(['Component', 'data', 'itemName', 'listStore'])
</script>

<template>
    <div class="win-lister">
        <WinView
            v-for="item in listStore.listOpened"
            :key="item.id"
            :Component="Component"
            :data="{
                ...data,
                itemName,
                [itemName]: item,
                item, // 方便内部使用
            }"
            :listStore="listStore"></WinView>
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
