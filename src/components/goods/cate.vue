<template>
  <div>
    <sc-breadcrumb :data="navigation"></sc-breadcrumb>
    <el-card class="box-card" style="margin-top:10px">
      <el-button type="primary" style="margin-bottom:20px" @click="addCate">添加分类</el-button>
      <!-- 树形表格 -->
        <vxe-table
          resizable
          tree-config
          border="full"
          ref="xTree"
          :data="tableData"
          :highlight-hover-row='true'
          @toggle-tree-expand="toggleExpandChangeEvent">
           <vxe-table-column type="seq" width="50"></vxe-table-column>
          <vxe-table-column field="cat_name" title="分类名称" tree-node></vxe-table-column>
          <vxe-table-column field="cat_deleted" title="是否有效"></vxe-table-column>
          <vxe-table-column field="cat_level" title="排序">
              <!-- <template v-slot='scope'>
                <pre>{{scope.row}}</pre>
              </template> -->
          </vxe-table-column>
          <vxe-table-column field="date" title="操作"></vxe-table-column>
        </vxe-table>
      <!-- 分页页脚 -->
      <div class="block" style="margin-top:10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pagenum"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="params.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
import { getCate } from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      tableData: [],
      params: {
        type: '',
        pagenum: 1,
        pagesize: 40
      },
      navigation: {
        // 面包屑组件数据
        name1: '商品管理',
        name2: '商品分类',
        separator: '>'
      },
      data: [],
      totalpage: 400

    }
  },
  created () {
    this.getCatePage()
  },
  methods: {
    async getCatePage () {
      const { data: res } = await getCate('categories', this.params)
      if (res.meta.status !== 200) { return this.$message({ type: 'error', message: res.meta.message }) }
      this.totalpage = res.data.total
      this.tableData = res.data.result
      // debugger
    },
    handleSizeChange (val) {
      this.params.pagesize = val
      this.getCatePage()
    },
    handleCurrentChange (val) {
      this.params.pagenum = val
      this.getCatePage()
    },
    toggleExpandChangeEvent () {

    },
    addCate () {},
    editCate () {}
  }
}
</script>>
<style lang='less' scoped>
.zk-table {
  font-size: 14px;
}
.back {
  background-color: red;
}

</style>
