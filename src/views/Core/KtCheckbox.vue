<template>
  <div>
    <el-checkbox :false-label="falseLable" :true-label="trueLable"  :disabled="!hasPerms(perms)" :value="modelParent" @change="changeValue" :label="label" border></el-checkbox>
  </div>
</template>

<script>
import { hasPermission } from '@/permission/index.js'
export default {
  name: 'KtCheckbox',
  props: {
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
    falseLable:String,
    trueLable:String,
    modelParent:String
  },
  data() {
    return {
    }
  },
  methods: {
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms) & !this.disabled
    },
    changeValue:function (data) {
      this.$emit('changeValue',data);

    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
