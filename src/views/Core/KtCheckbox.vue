<template>
  <div>
    <el-checkbox :true-label="trueLabel" :disabled="!hasPerms(perms)" :false-label="falseLabel" :label="label" v-model="model" border></el-checkbox>
  </div>
</template>

<script>
import { hasPermission } from '@/permission/index.js'
export default {
  name: 'KtCheckbox',
  props: {
    trueLabel: {  // 按钮显示文本
      type: String,
      default:'1'
    },
    falseLabel: {  // 按钮显示文本
      type: String,
      default:'2'
    },
    label: {  // 按钮显示文本
      type: String
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    },
    model:{
      type:String,
      default:null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms) & !this.disabled
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
