<script setup>
import { useThemeVars } from 'naive-ui'

defineProps(['name', 'msg'])

const themeVars = useThemeVars()
</script>

<template>
    <div class="tip">
        <div class="name">{{ name }}</div>
        <div class="msg">{{ msg }}</div>
    </div>
</template>

<style scoped>
.tip {
    line-height: 1.6;
    display: flex;
    color: v-bind('themeVars.textColor2');
}

.name {
    flex-shrink: 0;
}
.msg {
    margin-left: 9px;
}
</style>
