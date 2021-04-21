<template>
  <div class="home">
    <div class="nav">
      <div class="nav-inner">
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 background-color="#f6f6fa"
                 text-color="#414652"
                 active-text-color="#232935"
                 router>
          <el-menu-item index="/generate">
            <i class="el-icon-s-check"></i>
            <span slot="title">生成密钥</span>
          </el-menu-item>
          <el-menu-item index="/encrypt">
            <i class="el-icon-s-order"></i>
            <span slot="title">加密文件</span>
          </el-menu-item>
          <el-menu-item index="/decrypt">
            <i class="el-icon-s-claim"></i>
            <span slot="title">解密文件</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 20px;
  /* box-shadow: -7px 7px 14px #3c5ecf, 7px -7px 14px #517fff; */
  overflow: hidden;
  background-color: #fcfcfc;
}
.nav {
  height: 100%;
  background-color: #f6f6fa;
  .nav-inner {
    margin-top: 100px;
    .el-menu {
      width: 250px;
      border: none;
    }
  }
}
.container {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}
</style>
<style lang="scss">
.el-menu {
  .el-menu-item {
    padding: 0 30px !important;
    i {
      font-size: 24px;
      color: #232935;
    }
    span {
      margin-left: 20px;
      letter-spacing: 2px;
      font-size: 16px;
      font-weight: 600;
    }
    border-right: 3px solid #f6f6fa;
  }
  .el-menu-item:hover {
    background-color: #e8e8f6 !important;
  }
  .is-active {
    background-color: #e4e4f5 !important;
    border-color: #5c4ff9;
    i {
      color: #5c4ff9 !important;
    }
  }
}
</style>
