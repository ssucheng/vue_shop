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
        :highlight-hover-row="true"
        @toggle-tree-expand="toggleExpandChangeEvent"
      >
        <vxe-table-column type="seq" width="50"></vxe-table-column>
        <vxe-table-column field="cat_name" title="分类名称" tree-node></vxe-table-column>
        <vxe-table-column field="cat_deleted" title="是否有效">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.cat_deleted === false"
              size="mini"
              type="success"
              icon="el-icon-check"
              circle
            ></el-button>
            <el-button
              v-if="scope.row.cat_deleted === true"
              size="mini"
              type="danger"
              icon="el-icon-check"
              circle
            ></el-button>
          </template>
        </vxe-table-column>
        <vxe-table-column field="cat_level" title="排序">
          <template v-slot="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.cat_level === 2">三级</el-tag>
            <el-tag type="danger" v-else>四级</el-tag>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editCate(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delCate(scope.row)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 分页页脚 -->
      <div class="block" style="margin-top:10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pagenum"
          :page-sizes="[1, 3, 5, 10,20,40]"
          :page-size="params.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalpage"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog :title="dialogTitle[title]" :visible.sync="dialogFormVisible" @close='dialogClosed' >
      <el-form :model="form" ref="cateValidateForm"   label-width="100px" :rules="rules">
        <el-form-item label="分类名称"  prop="name">
          <el-input v-model="form.name" autocomplete="off" class="elInput"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="id" v-if="title === 'addTitle' ?true:false">
          <el-cascader :options="options" :props="props"  v-model="form.id" clearable class="elInput" @change='changeCascader(form)'></el-cascader>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
import { getCate, addCateApi, editCateApi, delCateApi } from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      optionData: [],
      dialogTitle: {
        addTitle: '添加分类',
        editTitle: '编辑分类'
      },
      title: '',
      dialogFormVisible: false,
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      form: {
        id: [],
        cat_pid: 0,
        cat_level: 0,
        name: ''
      },
      controlId: '', // 操做列的标识id
      tableData: [],
      params: {
        type: '',
        pagenum: 1,
        pagesize: 10
      },
      navigation: {
        // 面包屑组件数据
        name1: '商品管理',
        name2: '商品分类',
        separator: '>'
      },
      data: [],
      totalpage: 400,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCatePage()
  },
  methods: {
    async getCatePage () {
      const { data: res } = await getCate('categories', this.params)
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.message })
      }
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
    toggleExpandChangeEvent () {},
    dialogClosed () {
      this.$refs.cateValidateForm.resetFields()
      this.form.cat_pid = 0
      this.form.cat_level = 0
      this.form.id = []
      this.form.name = ''
    },
    async addCate () {
      // 添加分类
      this.title = 'addTitle'
      this.dialogFormVisible = true
      const { data: res } = await getCate('categories', {
        type: 2
      })
      if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.message })
      this.options = res.data
    },
    editCate (row) {
      // 编辑分类
      this.title = 'editTitle'
      this.dialogFormVisible = true
      console.log(row)
      this.form.name = row.cat_name
      this.form.id = row.cat_id
    },
    async delCate (row) {
      // 删除分类
      this.form.id = row.cat_id
      const confirmMessage = await this.$confirm(
        '此操作将永久取消该权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {})
      if (confirmMessage !== 'confirm') {
        return this.$message({ type: 'info', message: '删除操作已取消' })
      }
      const { data: res } = await delCateApi('categories', this.form)
      if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
      this.$message({ type: 'success', message: res.meta.msg })
      this.getCatePage()
    },
    submit () { // 提交
      if (this.title === 'addTitle') { // 添加分类
        this.$refs.cateValidateForm.validate(async valid => {
          if (!valid) return
          // console.log(this.form)
          // debugger
          const { data: res } = await addCateApi('categories', this.form)
          // console.log(res)
          // debugger
          if (res.meta.status !== 201) return this.$message({ type: 'error', message: res.meta.msg })
          // const {data:res} = await addCate('categories',{
          this.$message({ type: 'success', message: res.meta.msg })
          this.dialogFormVisible = false
          this.getCatePage()
          // })
          // this.dialogFormVisible = false
        })
      } else {
        this.$refs.cateValidateForm.validate(async valid => {
          if (!valid) return
          const { data: res } = await editCateApi('categories', this.form)
          if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
          this.$message({ type: 'success', message: res.meta.msg })
          this.dialogFormVisible = false
          this.getCatePage()
        })
      }
    },
    changeCascader (val) {
      console.log(val)
      if (val.id.length === 0) {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      } else {
        this.form.cat_pid = val.id[val.id.length - 1]
        this.form.cat_level = val.id.length
      }
    }

  }
}
</script>>
<style lang='less' scoped>
.elInput{
  width: 400px;
}
</style>
