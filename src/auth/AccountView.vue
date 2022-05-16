<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { authStore } from '.'
import { DeskStore } from '@/desk'
import IconAvatar from '@/components/icons/IconAvatar.vue'
import PropItem from '@/components/PropItem.vue'

const { token, user } = storeToRefs(authStore())
const { count } = storeToRefs(DeskStore())

const msg = computed(() =>
    token.value ? '　正在获取用户信息...' : '　正在初始化用户...'
)
</script>

<template>
    <div class="account">
        <IconAvatar></IconAvatar>
        <div class="content">
            <div v-if="user" class="user">
                <PropItem name="用户编号：" :value="user._id"></PropItem>
                <PropItem name="用户名称：" :value="user.username"></PropItem>
            </div>
            <div v-else class="name">本地用户</div>
            <ul class="tips">
                <li>离线状态下，可正常使用</li>
                <li>数据存本地，可放心使用</li>
            </ul>
            <div class="deskes">桌子：{{ count }} 个</div>
        </div>
    </div>
</template>

<style scoped>
.account {
    padding: 59px;
    display: flex;
}
.content {
    margin-left: 28px;
}
.user {
    display: flex;
    flex-direction: column;
}
.name {
    font-size: large;
}
.tips {
    margin-top: 39px;
    padding: 0;
    list-style-position: inside;
    list-style-type: square;
    line-height: 2;
}
.deskes {
    margin-top: 39px;
}
</style>
