<template>
    <div>
        <sc-breadcrumb :data="navigation"></sc-breadcrumb>
        <el-card class="box-card" shadow="always" style="margin-top:15px ">
      <!-- 搜索添加 -->
      <el-row :gutter="12">
        <el-col :span="8">
          <div>
            <el-input placeholder="请输入内容" v-model="totalObj.query" clearable @clear="selectGoods">
              <el-button slot="append" icon="el-icon-search" @click="selectGoods"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="addButton">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%; margin-top:15px">
        <el-table-column type="index" ></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）" ></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="upd_time" label="创建时间">
            <template v-slot='scope'>
                    {{scope.row.upd_time | dateFormat}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" @click="editButton(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" @click="delButton(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页页脚 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="totalObj.pagenum"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="totalObj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
import { getGoodsApi, delGoodsApi } from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      navigation: {
        // 面包屑组件数据
        name1: '商品管理',
        name2: '商品列表',
        separator: '>'
      },
      tableData: [{ // 表格数据

      }],
      total: 400,
      totalObj: {
        pagenum: 1,
        pagesize: 10,
        query: ''
      }
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    async getGoodList () { // 获取table数据源方法
      const { data: res } = await getGoodsApi('goods', this.totalObj)
      if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
      //   this.$message({ type: 'success', message: res.meta.msg })
      this.tableData = res.data.goods
      this.total = res.data.total
    },
    selectGoods () { // 查询的方法
      this.getGoodList()
    },
    addButton () { // 添加商品的方法
      this.$router.push('/goods/add')
    },
    editButton (row) { // 编辑按钮方法

    },
    async delButton (row) { // 删除按钮方法
      console.log(row)
      const confirmMessage = await this.$confirm(
        '此操作将永久取消该权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {})

      if (confirmMessage !== 'confirm') return this.$message({ type: 'info', message: '删除操作已取消' })
      //   debugger
      const { data: res } = await delGoodsApi('goods', {
        id: row.goods_id
      })
      if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
      this.$message({ type: 'success', message: res.meta.msg })
      this.getGoodList()
    },
    handleSizeChange (val) {
      this.totalObj.pagesize = val
      this.getGoodList()
    },
    handleCurrentChange (val) {
      this.totalObj.pagenum = val
      this.getGoodList()
    }
  },
  filters: {
    dateFormat: function (val) {
    //   return 1
      const dt = new Date(val)

      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  }

}
</script>
<style lang="less" scoped>

</style>
