<template>

  <el-input v-model="model" :disabled="!hasPerms(perms)"></el-input>

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
