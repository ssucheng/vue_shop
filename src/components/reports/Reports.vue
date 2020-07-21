<template>
  <div>
    <sc-breadcrumb :data="navigation"></sc-breadcrumb>
    <el-card class="box-card" shadow="always" style="margin-top:15px ">
        <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>

  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
import echarts from 'echarts'
import { getReportApi } from '../api/api'
import _ from 'lodash'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      navigation: {
        name1: '数据统计',
        name2: '数据列表',
        separator: '>'
      },
      dataEchart: {}
    }
  },
  created () {

  },
  async mounted () {
    var myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await getReportApi('reports/type/1')
    if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
    this.dataEchart = res.data
    var option = {
      title: {
        text: '用户来源'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#E9EEF3'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ]
    }
    // console.log(this.dataEchart)
    // console.log(option)
    _.merge(option, this.dataEchart)
    // console.log(result)
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {

  }

}
</script>
<style lang="less" scoped>
</style>
