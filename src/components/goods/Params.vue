<template>
  <div>
    <sc-breadcrumb :data="navigation"></sc-breadcrumb>
    <el-card class="box-card" style="margin-top:10px">
      <el-alert :title="errTitle" type="warning" :closable="false" show-icon></el-alert>
      <el-row style="margin-top:10px">
        <el-col>
          <span style="font-size:14px;margin-right:20px">选择商品分类:</span>
          <el-cascader
            v-model="value"
            :options="cascaderData"
            :props="cascaderProps"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="disMsg" type="primary" @click="addBtn">添加参数</el-button>
          <el-table :data="manyTableData" style="width: 100% ;margin-top:20px" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tag
                  :key="index"
                  v-for="(item,index) in props.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(item,props.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="props.row.inputVisible"
                  v-model="props.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column label="#" width="50px" type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editBtn(scope.row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="delBtn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button :disabled="disMsg" type="primary" @click="addBtn">添加属性</el-button>
          <el-table :data="onlyTableData" style="width: 100%;margin-top:20px" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                <el-tag
                  :key="index"
                  v-for="(item,index) in props.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(item,props.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="props.row.inputVisible"
                  v-model="props.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column label="#" width="50px" type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editBtn(scope.row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="delBtn(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle[title] + textTitle"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
    >
      <el-form :model="form" label-width="100px" :rules="FormRules" ref="formRef">
        <el-form-item :label="textTitle" prop="attr_name">
          <el-input v-model="form.attr_name"></el-input>
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
import {
  getCate,
  getCateAttributesApi,
  addCateOrApi,
  putCateAttrApi,
  delCateAttrApi
} from '../api/api'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      dynamicTags: [],
      edit_attr_id: '',
      form: {
        attr_name: ''
      },
      dialogFormVisible: false,
      dialogTitle: {
        addTitle: '添加',
        editTitle: '修改'
      },
      title: 'addTitle',
      errTitle: '注意： 只允许第三级分类设置相关参数', // 警告标题
      navigation: {
        // 面包屑组件数据
        name1: '商品管理',
        name2: '参数列表',
        separator: '>'
      },
      value: [], // 级联选择器id值集合
      cascaderData: [],
      cascaderProps: {
        // 匹配字段
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      activeName: 'many',
      manyTableData: [], // 动态表格数据
      onlyTableData: [], // 静态表格数据
      FormRules: {
        attr_name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCateApi()
  },

  methods: {
    async getCateApi () { // 级联选择器数据源
      const { data: res } = await getCate('categories', {
        type: 3
      })
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      this.cascaderData = res.data
    },
    async handleChange () { // 级联选择器
      if (this.value.length === 0) {
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      this.getCateAttr()
    },
    async getCateAttr () { // 获取分类参数列表
      if (this.value.length !== 3) {
        this.value = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      const { data: res } = await getCateAttributesApi('categories', {
        cateId: this.cateId,
        activeName: this.activeName
      })
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      // console.log(res)
      res.data.forEach(item => {
        // 将字符串切割 成数组重新赋值给自己 改变自己的属性值
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.inputVisible = false
        item.inputValue = ''
      })

      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },
    handleClick (val) { // tab切换
      this.getCateAttr()
    },
    clearCheckedNodes () {},
    editBtn (row) { // 编辑按钮事件
      this.title = 'editTitle'
      this.edit_attr_id = row.attr_id
      this.form.attr_name = row.attr_name
      this.form.attr_vals = row.attr_vals
      this.dialogFormVisible = true
      console.log(this.form.attr_vals)
    },
    addBtn () { // 添加按钮事件
      this.title = 'addTitle'
      this.form.attr_name = ''
      this.dialogFormVisible = true
    },
    async delBtn (row) { // 删除按钮事件
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
      const { data: res } = await delCateAttrApi('categories', {
        id: this.cateId,
        attr_id: row.attr_id
      })
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      this.$message({ type: 'success', message: res.meta.msg })
      this.getCateAttr()
    },
    async submit () { // 弹窗确定函数
      if (this.title === 'addTitle') {
        this.$refs.formRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await addCateOrApi('categories', {
            cateId: this.cateId,
            attr_name: this.form.attr_name,
            attr_sel: this.activeName
          })
          if (res.meta.status !== 201) {
            return this.$message({ type: 'error', message: res.meta.msg })
          }
          this.$message({ type: 'success', message: res.meta.msg })
          this.dialogFormVisible = false
          this.getCateAttr()
        })
      } else {
        this.$refs.formRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await putCateAttrApi('categories', {
            id: this.cateId,
            attr_id: this.edit_attr_id,
            attr_name: this.form.attr_name,
            attr_sel: this.activeName,
            attr_vals: this.form.attr_vals.join(' ')
          })
          if (res.meta.status !== 200) {
            return this.$message({ type: 'error', message: res.meta.msg })
          }
          this.$message({ type: 'success', message: res.meta.msg })
          this.dialogFormVisible = false
          this.getCateAttr()
        })
      }
    },
    resetForm () { // 清空表单
      this.$refs.formRef.resetFields()
    },
    handleClose (item, row) { // tagb变迁关闭方法
      row.attr_vals.splice(row.attr_vals.indexOf(item), 1)
      this.tagPut(row)
    },
    async handleInputConfirm (row) { // enter键盘  or 失去焦点 触发函数
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 发起修改请求
      this.tagPut(row)
    },
    showInput (row) { // 点击mew tag按钮触发函数
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async tagPut (row) { // tab更新请求方法
      const { data: res } = await putCateAttrApi('categories', {
        id: this.cateId,
        attr_id: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(' ')
      })
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      this.$message({ type: 'success', message: res.meta.msg })
    }

  },
  computed: {
    disMsg: function () {
      // 控制是否禁用添加按钮
      if (this.value.length === 3) {
        return false
      }
      return true
    },
    cateId: function () {
      // 获取三级id
      if (this.value.length === 3) {
        return this.value[this.value.length - 1]
      } else {
        return null
      }
    },
    textTitle: function () {
      if (this.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
 .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>>
