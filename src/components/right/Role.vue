<template>
  <div>
    <!-- 面包屑导航 -->
    <sc-breadcrumb :item-prop="navigation"></sc-breadcrumb>
    <!-- 视图card -->
    <el-card class="box-card" style="margin-top:10px">
      <el-button type="primary" style="margin-bottom:20px" @click="addRole">添加角色</el-button>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
              v-for="(item,index) in props.row.children"
              :key="item.id"
              :class="[`elRow2`,index === 0 ?`elRow1`:'' ,`vcenter`]"
            >
              <!-- 一级 -->
              <el-col :span="5">
                <el-tag>{{item.authName}}</el-tag>
              </el-col>
              <!-- 二级  三级渲染-->
              <el-col :span="19">
                <el-row
                  v-for="(item1,index1) in item.children"
                  :key="item1.id"
                  :class="[index1 === 0 ?``:'elRow1' ,`vcenter`]"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{item1.authName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="(item2,index2) in item1.children"
                      :key="index2"
                      @close="handleClose(props.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete-solid" @click="delRole(scope.row)">删除</el-button>
            <el-button type="warning" icon="el-icon-s-tools" @click="assignRole(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加编辑框 -->
    <el-dialog
      :title="dialogTitleSel[dialogTitle]"
      :visible.sync="dialogFormVisible"
      @close="addDialogClosed"
      width="35%
      "
    >
      <el-form
        :model="form"
        ref="addRoleForm"
        :rules="rules"
        v-if="dialogTitleSel[dialogTitle] == `角色授权`? false:true"
      >
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName" >
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc" >
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 树形结构 -->
      <el-tree  v-loading="loading" ref="treeRef"  element-loading-background="rgba(255, 255, 255, 1)" :data="treeData"  :props="treeProps" node-key="id" :default-checked-keys="defaultKeys" show-checkbox default-expand-all v-if="dialogTitleSel[dialogTitle] == `角色授权`? true:false"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import scBreadcrumb from '../loading/scBreadcrumb'
export default {
  components: { scBreadcrumb },
  data () {
    return {
      dialogTitleSel: { // 弹窗 标题对象
        addRole: '添加角色',
        editRole: '编辑角色',
        assignRole: '角色授权'
      },
      dialogTitle: 'addRole', // 弹窗 标题
      dialogFormVisible: false, // 控制显示隐藏
      form: { // 表单数据
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px',
      navigation: { // 面包屑组件 导航参数
        name1: '角色管理',
        name2: '角色列表',
        separator: '>'
      },
      tableData: [], // 表格数据
      treeData: [], // 树型结构数据
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      defaultKeys: [],
      loading: true,
      roleId: '', // 角色id  授权
      rules: { // 验证规则
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          { required: false, message: '请输入描述', trigger: 'blur' },
          {
            max: 15,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    async delRole (row) {
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
      const { data: res } = await this.$http.delete('roles/' + row.id)
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      this.$message({ type: 'success', message: res.meta.msg })
      this.getRoles()
      //  console.log(row)
      // debugger
    },
    addDialogClosed () { // 关闭弹窗时触发 清空数据
      if (this.dialogTitle !== 'assignRole') return this.$refs.addRoleForm.resetFields()
      this.defaultKeys = []
      this.loading = true
    },
    addRole () { // 添加角色
      this.dialogTitle = 'addRole'
      this.dialogFormVisible = true
      this.form = {}
    },
    editRole (row) { // 编辑角色
      this.dialogTitle = 'editRole'
      this.dialogFormVisible = true
      this.form = {
        roleName: row.roleName,
        roleDesc: row.roleDesc,
        rid: row.id
      }
    },
    async assignRole (row) { // 授权角色
      this.dialogTitle = 'assignRole'
      this.dialogFormVisible = true
      // return console.log(this.treeData)
      this.roleId = row.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
      this.treeData = res.data
      const _this = this // 暂存this
      setTimeout(function () { _this.loading = false }, 500)
      this.getTreeKeys(row, this.defaultKeys)
    },
    // 递归函数拿到第三层节点  role数据  arr数组
    getTreeKeys (role, arr) {
      if (!role.children) return arr.push(role.id)
      role.children.forEach(item => {
        this.getTreeKeys(item, arr)
      })
    },
    async submit () {
      if (this.dialogTitle === 'addRole') {
        this.$refs.addRoleForm.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('roles', this.form)
          if (res.meta.status !== 201) {
            return this.$message({ type: 'error', message: res.meta.msg })
          }
          this.$message({ type: 'success', message: res.meta.msg })
          this.dialogFormVisible = false
          this.getRoles()
        })
      } else if (this.dialogTitle === 'editRole') {
        this.$refs.addRoleForm.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.put('roles/' + this.form.rid, {
            roleName: this.form.roleName,
            roleDesc: this.form.roleDesc
          })
          if (res.meta.status !== 200) {
            return this.$message({ type: 'error', message: res.meta.msg })
          }
          this.$message({ type: 'success', message: res.meta.msg })
          this.dialogFormVisible = false
          this.getRoles()
        })
      } else {
        const keyArray = [
          ...this.$refs.treeRef.getHalfCheckedKeys(),
          ...this.$refs.treeRef.getCheckedKeys(false)
        ]
        const idStr = keyArray.join(',')
        const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, {
          rids: idStr
        })
        console.log(res)
        if (res.meta.status !== 200) return this.$message({ type: 'error', message: res.meta.msg })
        this.$message({ type: 'success', message: res.meta.msg })
        this.dialogFormVisible = false
        this.getRoles()
      }
    },
    async handleClose (row, rid) {
      // 权限标签删除方法
      // row.id = {}
      // 可以通过方法更改slot-scope=“scope”  scope.row 中的 row中的属性
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
        return this.$message({ type: 'info', message: '已取消修改操作' })
      }
      const { data: res } = await this.$http.delete(
        `roles/${row.id}/rights/${rid}`
      )
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      this.$message({ type: 'success', message: res.meta.msg })
      row.children = res.data // 将返回的权限数据 修改 scope.row 中children的属性  这个是更改props.row 中的children
    },
    async getRoles () {
      // 列表方法
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message({ type: 'error', message: res.meta.msg })
      }
      this.tableData = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.elRow1 {
  border-top: 1px solid #eee;
}
.elRow2 {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
