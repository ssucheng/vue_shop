<template>
  <el-container>
    <el-header>
      <img src="../assets/logo.png" alt style="width:70px;height=50px" />
      <div>后台管理系统</div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px' :'200px'">
         <div @click="toggleBtn" type='info'  class="toggle-button">|||</div>
        <el-menu
          :default-active="$router.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          v-for="(item,index) in metuList"
          :key="item.id"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >

          <el-submenu :index="item.id + ''">
            <template slot="title">
              <i :class="MenuIcont[index]" style="margin-right:5px"></i>
              <span >{{item.authName}}</span>
            </template>
            <el-menu-item-group v-for="item1 in item.children" :key="item1.id">
              <el-menu-item :index="`/`+ item1.path">{{item1.authName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>>
<script>
export default {
  data () {
    return {
      // 图标
      MenuIcont: ['iconfont iconyonghuguanli',
        'iconfont iconquanxianguanli',
        'iconfont iconhoutaishangpinguanli',
        'iconfont icondingdanguanli',
        'iconfont iconshujutongji'],

      // 右侧权限数据列表
      metuList: [],
      // 关闭
      isCollapse: false

    }
  },
  created () {
    this.loginList()
  },
  methods: {
    loginOut () {
      // 退出跳转登录页
      window.sessionStorage.clear()
      this.$router.push('/')
    },

    async loginList () {
      // 获取登录列表页
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error('菜单列表获取失败')
      this.metuList = res.data
      // console.log(this.metuList)
    },
    toggleBtn () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>>
<style lang='less' scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;

  .el-button {
    height: 50px;
    margin: auto 0;
  }
}
.el-aside {
  background-color: #545c64;
  .el-menu{
  border-right: none;
}
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>>
