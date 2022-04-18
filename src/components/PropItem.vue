<script setup>
import { useThemeVars } from 'naive-ui'

defineProps(['name', 'value'])

const themeVars = useThemeVars()
</script>

<template>
    <div class="prop">
        <span class="name">{{ name }}</span>
        <span class="value">{{ value }}</span>
    </div>
</template>

<style scoped>
.prop {
    line-height: 2;
}
.value {
    margin-left: 9px;
}
.name {
    color: v-bind('themeVars.textColor3');
}
</style>
