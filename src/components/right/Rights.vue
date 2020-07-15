<template>
  <div>
    <!-- 面包屑 -->
      <sc-breadcrumb :item-prop='navigation'></sc-breadcrumb>
    <!-- 视图card -->
    <el-card class="box-card" style="margin-top:10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0 ">一级</el-tag>
            <el-tag v-else-if="scope.row.level == 1 " type="success">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
// import { getRoles } from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      navigation: {
        name1: '权限管理',
        name2: '权限列表',
        separator: '>'
      },
      tableData: [{}]
    }
  },
  created () {
    this.rightList()
    // this.ceshi()
  },
  methods: {
    async rightList () {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error({
          type: 'error',
          message: res.meta.msg
        })
      }
      this.tableData = res.data
    }
    // 测试api文件的
    // ceshi () {
    //   getRoles('roles').then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
