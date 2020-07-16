<template>
    <div>
        <!-- 面包屑 -->
    <el-breadcrumb :separator="item.separator" >
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{item.name1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{item.name2}}</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>
<script>
export default {
  name: 'scBreadcrumb',
  props: {
    data: {
      type: Object

    }
  },
  data () {
    return {
      item: {

      }
    }
  },
  created () {
    var that = this
    that.item = that.data
  }
}
</script>
<style lang="less" scoped>

</style>
