<template>
  <div>
    <!-- 面包屑 -->
     <sc-breadcrumb :item-prop='navigation'></sc-breadcrumb>
    <!-- car视图区域 -->
    <el-card class="box-card" shadow="always" style="margin-top:15px ">
      <!-- 搜索添加 -->
      <el-row :gutter="12">
        <el-col :span="8">
          <div>
            <el-input placeholder="请输入内容" v-model="totalObj.query" clearable @clear="selectUser">
              <el-button slot="append" icon="el-icon-search" @click="selectUser"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="addButton">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" border style="width: 100%; margin-top:15px">
        <el-table-column type="index" ></el-table-column>
        <el-table-column prop="username" label="姓名" ></el-table-column>
        <el-table-column prop="email" label="邮箱" ></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userChange(scope.row)"
            ></el-switch>
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
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" @click="assginButton(scope.row)">
              <el-button type="warning" icon="el-icon-setting"></el-button>
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
          :total="totalpage"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加编辑窗口 -->
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" @close="addDialogClosed">
      <el-form :model="form" :rules="rules" ref="addForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" :disabled="formTitle === `编辑用户` || formTitle === `分配角色`?`disabled`:false"></el-input>
        </el-form-item>
        <el-form-item
          label="用户密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" :disabled="formTitle === `分配角色`?`disabled`:false" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" :disabled="formTitle === `分配角色`?`disabled`:false" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="分配角色" :label-width="formLabelWidth" v-if="formTitle === `分配角色`?true:false" prop="mobile">
           <el-select v-model="form.region" placeholder="请选择活动区域">
             <el-option   v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">>
            </el-option>
          </el-select>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
export default {
  components: { scBreadcrumb },
  data () {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      navigation: {
        name1: '用户管理',
        name2: '用户列表',
        separator: '>'
      },
      totalpage: 400, // 总条数
      totalObj: {
        // 接口参数
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      value: true, // 状态开关
      dialogFormVisible: false, // 提示框控制属性
      tableData: [], // 表格数据
      formLabelWidth: '120px', // 单元格长度
      formTitle: '添加用户',
      form: {
        // 提示框数据
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      options: [], // 分配角色
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名密码的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.selectUser()
  },
  methods: {
    addDialogClosed () {
      // 关闭弹窗时触发
      this.$refs.addForm.resetFields()
    },
    addButton () {
      this.formTitle = '添加用户'
      this.dialogFormVisible = true
      this.form = {}
    },
    editButton (row) {
      this.formTitle = '编辑用户'
      this.dialogFormVisible = true
      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        email: row.email,
        mobile: row.mobile
      }
    },
    assginButton (row) {
      this.formTitle = '分配角色'
      this.dialogFormVisible = true
      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        email: row.email,
        mobile: row.mobile
      }
    },
    // async
    async delButton (row) { // 删除用户
      const { data: res } = await this.$http.delete('/users/' + row.id)
      if (res.meta.status !== 200) { return this.$message({ type: 'error', message: row.meta.msg }) }
      this.$message.success('删除成功')
      this.selectUser()
    },
    submit () {
      if (this.formTitle === '添加用户') {
        this.$refs.addForm.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('/users', this.form)
          console.log(res)
          if (res.meta.status !== 201) {
            return this.$message.error({
              showClose: true,
              message: res.meta.msg,
              type: 'error'
            })
          }
          this.dialogFormVisible = false
          this.$message.success('添加用户成功')
          this.selectUser()
        })
      } else {
        this.$refs.addForm.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.put(`/users/${this.form.id}`, {
            email: this.form.email,
            mobile: this.form.mobile
          })
          //   console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error({
              showClose: true,
              message: res.meta.msg,
              type: 'error'
            })
          }
          this.dialogFormVisible = false
          this.$message.success('修改用户成功')
          this.selectUser()
        })
      }
    },
    async selectUser () {
      // 查询用户列表方法
      const { data: res } = await this.$http.get('/users', {
        params: this.totalObj
      })
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表获取失败')
      }
      //   console.log(res.data)
      this.tableData = res.data.users
      this.totalpage = res.data.total
    },
    async userChange (userInfo) {
      // 修改用户权限方法
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) return this.$message.error('状态改变失败')
      this.$message.success('状态改变')
      this.selectUser()
      //   this.$$message.success('')
    },
    handleSizeChange (val) {
      // //   console.log(`每页 ${val} 条`)
      this.totalObj.pagesize = val

      this.selectUser()
    },
    handleCurrentChange (val) {
      //   console.log(`当前页: ${val}`)
      this.totalObj.pagenum = val
      this.selectUser()
    }
  }
}
</script>>
<style lang="less" scoped>
.block {
  margin-top: 10px;
}
</style>
