<script setup>
import { NPopconfirm, NPopover, NText, useThemeVars } from 'naive-ui'
import IconTable from '@/components/icons/IconTable.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import EditorView from '../EditorView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deleteDesk } from '../desk'

const props = defineProps(['desk'])

const themeVars = useThemeVars()
const router = useRouter()

const showEditor = ref(false)
const onDeskEdit = () => {
    showEditor.value = true
}
const onDeskDelete = () => {
    deleteDesk(props.desk, router)
}
</script>
<template>
    <div class="header">
        <NPopover
            style="min-width: 200px; max-width: 800px"
            placement="right-start"
            trigger="hover">
            <template #trigger>
                <IconTable class="icon" width="50" height="50"></IconTable>
            </template>
            <template #header>
                <NText strong depth="1"> {{ desk.name }} </NText>
            </template>
            <p style="white-space: pre-wrap; word-break: break-all">
                {{ desk.goal }}
            </p>
        </NPopover>
        <div class="content">
            <div class="name">{{ desk.name }}</div>
            <div class="actions">
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <EditorView v-model:show="showEditor" :desk="desk"></EditorView>
                <NPopconfirm @positive-click="onDeskDelete">
                    <template #trigger>
                        <div class="action" title="删除桌子">
                            <IconDelete width="16" height="16"></IconDelete>
                        </div>
                    </template>
                    <div>
                        确认删除此桌子？
                        <p>删除后数据将无法恢复！</p>
                    </div>
                </NPopconfirm>
            </div>
        </div>
        <div>
            <div class="toolbar">
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
            </div>
            <div class="toolbar">
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconEdit width="16" height="16"></IconEdit>
                </div>
                <div class="action" title="编辑桌子" @click="onDeskEdit">
                    <IconDelete width="16" height="16"></IconDelete>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    padding: 5px 9px 2px;
    background-color: rgba(237, 205, 250, 0.124);
}

.icon {
    cursor: pointer;
}

.content {
    flex: 1;
    padding: 0 19px 0 9px;
    /* 允许子文本单行超出显示省略号 */
    overflow: hidden; /* 或者 min-width: 0 */
}

.name {
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}

.actions {
    margin-top: 2px;
    color: v-bind('themeVars.textColor3');
    display: flex;
}

.action {
    cursor: pointer;
    padding: 3px 3px 0;
}

.toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 3px;
}
</style>
