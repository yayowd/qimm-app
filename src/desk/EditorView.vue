<script setup>
import { NModal, NForm, NFormItem, NInput } from 'naive-ui'
import { ref, watchEffect, computed } from 'vue'
import { DeskStore } from '.'
import { saveDesk } from './desk'
import { onFocusinSelAll } from '@/common/util'
import TipItem from '@/components/TipItem.vue'
import { useRouter } from 'vue-router'

const props = defineProps(['show', 'desk'])

const title = computed(() => (props.desk ? '编辑桌子' : '添加桌子'))

// v-model support
const emit = defineEmits(['update:show'])
const onUpdateShow = show => emit('update:show', show)

// form binds
const data = ref({
    id: null,
    name: null,
    goal: null,
})
const checkName = (_, value) => {
    const name = value.trim()

    const { desk } = props
    if (desk && desk.name === name) return true

    const { exsitName } = DeskStore()
    if (exsitName(name)) return new Error('名称重复')

    return true
}

const rules = {
    name: [
        {
            required: true,
            whitespace: true,
            trigger: ['input'],
            message: '名称不能为空白',
        },
        {
            validator: checkName,
            trigger: ['input'],
        },
    ],
    goal: {
        required: true,
        whitespace: true,
        trigger: ['input'],
        message: '目标不能为空白',
    },
}

watchEffect(() => {
    const { show, desk } = props
    if (show && desk) data.value = { ...desk }
})

// form submit
const refForm = ref(null)
const router = useRouter()
const onSave = async () => {
    await refForm.value?.validate()

    const { id, name, goal } = data.value
    const desk = saveDesk({ id, name: name.trim(), goal: goal.trim() })

    // 导航到新创建的桌子：强制导航 => 用于更新当前页面的数据
    router.push({ name: 'desk', params: { id: desk.id }, force: true })

    // 新建成功后
    if (!id) {
        // 清空数据
        data.value = { name: null, goal: null }

        // 激活第一个输入框，以便使用 Ctrl + Enter 能够继续创建
        focusName()
    }
}

// form input: enter key to focus next
const refGoal = ref(null)
const focusGoal = () => refGoal.value && refGoal.value.focus()
const refName = ref(null)
const focusName = () => refName.value && refName.value.focus()
</script>

<template>
    <NModal
        :show="show"
        :on-update:show="onUpdateShow"
        preset="dialog"
        :show-icon="false"
        :title="title"
        style="
            position: fixed;
            left: 0;
            right: 0;
            top: 50px;
            width: 50%;
            min-width: 500px;
            max-width: 800px;
        "
        positive-text="保存"
        negative-text="取消"
        @positive-click="onSave">
        <NForm
            ref="refForm"
            :model="data"
            :rules="rules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
            @keyup.capture.ctrl.exact.enter.stop.prevent="onSave">
            <NFormItem label="名称" path="name">
                <NInput
                    ref="refName"
                    v-model:value="data.name"
                    placeholder="名称"
                    @focusin="onFocusinSelAll"
                    @keyup.enter.stop.prevent="focusGoal"></NInput>
            </NFormItem>
            <NFormItem label="目标" path="goal">
                <NInput
                    ref="refGoal"
                    v-model:value="data.goal"
                    placeholder="目标"
                    type="textarea"
                    size="small"
                    @focusin="onFocusinSelAll"
                    :autosize="{ minRows: 3 }"></NInput>
            </NFormItem>
            <TipItem
                name="提示："
                msg="一个桌子就是一个目标，
                可以是一个思路、一个方案、一次创作、一件事情、一个任务、一个项目或一个奇思妙想，
                然后将实现这个目标的努力一点点放在上面。"></TipItem>
        </NForm>
    </NModal>
</template>
