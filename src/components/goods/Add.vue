<template>
  <div>
    <sc-breadcrumb :data="navigation"></sc-breadcrumb>
    <el-card class="box-card" shadow="always" style="margin-top:15px ">
      <el-alert title="消息提示的文案" type="info" center show-icon :closable='false'></el-alert>
      <el-steps :space="200" :active="1" finish-status="success" :align-center='true' >
        <el-step  title="已完成"></el-step>
        <el-step  title="进行中"></el-step>
        <el-step  title="步骤 3"></el-step>
        <el-step  title="步骤 3"></el-step>
        <el-step  title="步骤 3"></el-step>
        <el-step  title="步骤 3"></el-step>

      </el-steps>
       <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
    </el-card>
  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
import {} from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      navigation: {
        // 面包屑组件数据
        name1: '商品管理',
        name2: '添加商品',
        separator: '>'
      },
      tabPosition: 'left'
    }
  },
  created () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.el-steps{
    margin-top:10px;
    .el-step__title{
        font-size: 13px;
    }
}
</style>
