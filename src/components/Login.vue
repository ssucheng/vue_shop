<template>
    <div class="login">
        <!-- 盒子整体部分 -->
        <div class="login_box">
            <!-- 头像 -->
            <div class="login_img">
              <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单 -->
              <el-form class="login_form" :model="ruleForm" :rules='rules' ref="ruleForm"  label-width="100px"  >
                 <el-form-item label="用户名" prop="name">
                     <el-input v-model="ruleForm.name" prefix-icon="icon iconuser"></el-input>
                 </el-form-item>
                 <el-form-item label="密码" prop="password" >
                     <el-input v-model="ruleForm.password" prefix-icon="icon iconmima" type="password" ></el-input>
                 </el-form-item>
                 <el-form-item class="btns" >
                      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                 </el-form-item>
              </el-form>
        </div>
    </div>
</template>>
<script>
export default {
  data () {
    return {
      ruleForm: {
        name: 'admin',
        password: '123456',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用域名', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 登录
    //     {
    //     "data": {
    //         "id": 500,
    //         "rid": 0,
    //         "username": "admin",
    //         "mobile": "123",
    //         "email": "123@qq.com",
    //         "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
    //     },
    //     "meta": {
    //         "msg": "登录成功",
    //         "status": 200
    //     }
    // }
    submitForm (formName) {
      // console.log(val)
      // 打印表单数据
      // console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('login', {
            username: this.ruleForm.name,
            password: this.ruleForm.password
          }).then(res => {
            // console.log(res)
            const { data } = res
            const { meta } = data
            if (meta.status === 200) {
              this.$message.success('登录成功')
            } else {
              this.$message({
                showClose: true,
                message: meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm (val) {
      // console.log(val)
    }
  }
}
</script>>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box{
    width: 400px;
    height: 260px;
    position: relative;
    border-radius: 5px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: white;

    .login_img{
      width: 80px;
      height: 80px;
      position: absolute;
      left: 50%;
      top:-65px;
      transform: translate(-50%);
      background-color: white;
      border-radius: 50%;
      overflow: hidden;
      border:1px solid gray;
      img{
        width: 100%;
        height: 100%;

      }
    }
    .login_form{
      box-sizing:border-box;
      padding-right:30px;
      padding-top:50px;

    }
    .btns{
          display: flex;
          justify-content: flex-start;
          width: 100%;

        }

  }
}

</style>
