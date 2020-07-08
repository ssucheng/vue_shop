<template>
    <div>我是home
         <el-button type="info" @click="loginOut">退出</el-button>
    </div>

</template>>
<script>
export default {
  methods: {
    loginOut () {
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>>
<style lang='less' scoped>

</style>>
