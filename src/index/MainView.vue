<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { NButton, useMessage, useNotification, useThemeVars } from 'naive-ui'
import { DeskStore } from '@/desk'
import EditorView from '@/desk/EditorView.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
// import { initAccount } from '@/auth/account'

// setup global vars
window.$message = useMessage()
window.$notify = useNotification()

// colors
const themeVars = useThemeVars()

// deskes list and adder
const { list } = storeToRefs(DeskStore())
const showEditor = ref(false)
const onDeskAdd = () => {
    showEditor.value = true
}

onMounted(async () => {
    // await initAccount()
})
</script>

<template>
    <div class="main">
        <div class="router">
            <RouterLink to="/" title="用户信息">
                <IconHome class="router-icon" width="44" height="26"></IconHome>
            </RouterLink>
            <div class="router-adder">
                <NButton :bordered="false" @click="onDeskAdd" title="添加桌子">
                    <IconAdd width="22" height="22"></IconAdd>
                </NButton>
            </div>
            <div class="router-deskes">
                <RouterLink
                    class="router-desk"
                    v-for="desk in list"
                    :key="desk.id"
                    :to="`/desk/${desk.id}`"
                    :title="desk.name">
                    <span class="router-desk-name">{{ desk.name }}</span>
                </RouterLink>
            </div>
            <EditorView v-model:show="showEditor"></EditorView>
        </div>
        <div class="content">
            <RouterView v-slot="{ Component }">
                <template v-if="Component">
                    <Transition mode="out-in" appear>
                        <KeepAlive>
                            <Suspense>
                                <!-- 主要内容 -->
                                <component :is="Component"></component>
                                <!-- 加载中状态 -->
                                <template #fallback> 正在加载... </template>
                            </Suspense>
                        </KeepAlive>
                    </Transition>
                </template>
            </RouterView>
        </div>
        <div class="footer">status</div>
    </div>
</template>

<style scoped>
.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.router {
    display: flex;
}
.router-icon {
    display: block;
    margin: 5px 9px;
}
.router-adder {
    border-left: 1px rgba(170, 181, 189, 0.5) solid;
    border-right: 1px rgba(170, 181, 189, 0.5) solid;
}
.router-deskes {
    display: flex;
    overflow-x: auto;
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.router-deskes::-webkit-scrollbar {
    /* Hide scrollbar for Chrome, Safari and Opera */
    display: none;
}
.router-desk {
    border-right: 1px rgba(170, 181, 189, 0.5) solid;
    color: v-bind('themeVars.textColor2');
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 159px;
    min-width: 69px;
}
.router-desk-name {
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 9px;
}
.router-desk:hover {
    color: rgb(240, 145, 12);
}
/* 当前选中导航菜单 */
.router-link-active {
    color: rgb(247, 111, 61);
    background-color: rgba(99, 99, 0, 0.1);
    font-weight: bold;
}
.content {
    flex: 1;
    display: flex;
    overflow: hidden;
}
.footer {
    flex-basis: 18px;
}
</style>
