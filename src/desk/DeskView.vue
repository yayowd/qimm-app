<script setup>
import { ref, watchEffect } from 'vue'
import { useThemeVars, NButton, NIcon } from 'naive-ui'
import { useRouter } from 'vue-router'
import { DeskStore } from '.'
import { deleteDesk } from './desk'
import HeaderView from './components/HeaderView.vue'
import WorkspaceView from './components/WorkspaceView.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

const props = defineProps(['id'])

const themeVars = useThemeVars()
const router = useRouter()

const desk = ref(null)
watchEffect(() => {
    try {
        const { id } = props
        const { findById } = DeskStore()
        desk.value = findById(id)
    } catch (e) {
        desk.value = null
        console.log('Desk', e)
    }
})

const onDeskDelete = () => deleteDesk(props, router)
</script>

<template>
    <div v-if="desk" class="desk">
        <HeaderView :desk="desk"></HeaderView>
        <WorkspaceView :desk="desk"></WorkspaceView>
    </div>
    <div v-else class="notfound">
        <p>没找到您想要的那个桌子</p>
        <NButton class="delete" size="small" @click="onDeskDelete">
            <template #icon>
                <NIcon>
                    <IconDelete width="16" height="16"></IconDelete>
                </NIcon>
            </template>
            删除此记录
        </NButton>
    </div>
</template>

<style scoped>
.desk {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.notfound {
    flex: 1;
    color: v-bind('themeVars.textColor3');
    font-size: larger;
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.delete {
    margin-top: 19px;
}
</style>
