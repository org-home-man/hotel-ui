<template>

  <el-input v-model="parentValue"  :disabled="!hasPerms(perms)" ></el-input>

</template>

<script>
import { hasPermission } from '@/permission/index.js'
export default {
  name: 'KtInput',
  props: {
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    },
    modelValue:String

  },
  data() {
    return {
      parentValue:this.modelValue
    }
  },
  methods: {
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms) & !this.disabled
    }
  },
  watch:{
    parentValue:function (newVal,oldVal) {
      this.$emit("changInputValue",newVal);
    },
    modelValue:function (newVal,oldVal) {
      this.parentValue = newVal;
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
