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
        <el-col :span="8"></el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%; margin-top:15px">
        <el-table-column type="index" v-if="true"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <!-- {{scope.row.order_pay}} -->
            <el-tag type="success" v-if="scope.row.order_pay?false:true">付款成功</el-tag>
            <el-tag type="danger" v-else-if="scope.row.order_pay?true:false">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template v-slot="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" @click="editButton(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="物流" placement="top">
              <el-button type="warning" icon="el-icon-location" @click="delButton(scope.row)"></el-button>
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
    <!-- 物流弹窗
    -->
    <el-dialog title="查看物流信息" :visible.sync="dialogVisible" width="30%" @close='closeed'>
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.ftime"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
import { getOrdersApi, getKuaidiApi } from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      reverse: false, // 控制正序倒序
      activities: [],
      dialogVisible: false,
      navigation: {
        // 面包屑组件数据
        name1: '订单管理',
        name2: '订单列表',
        separator: '>'
      },
      tableData: [
        {
          // 表格数据
        }
      ],
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
    async getGoodList () {
      // 获取table数据源方法
      const { data: res } = await getOrdersApi('orders', this.totalObj)
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      //   this.$message({ type: 'success', message: res.meta.msg })
      this.tableData = res.data.goods
      this.total = res.data.total
    },
    selectGoods () {
      // 查询的方法
      this.getGoodList()
    },
    editButton (row) {
      // 编辑按钮方法
    },
    async delButton (row) {
      this.dialogVisible = true
      const { data: res } = await getKuaidiApi('kuaidi', {
        id: 804909574412544580
      })
      if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
      this.activities = res.data
    },
    handleSizeChange (val) {
      this.totalObj.pagesize = val
      this.getGoodList()
    },
    handleCurrentChange (val) {
      this.totalObj.pagenum = val
      this.getGoodList()
    },
    closeed () {
      this.activities = []
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
