<template>
  <div class="genarate">
    <h1>生成密钥</h1>
    <div class="key-option">
      <div class="generate-key">
        <p>生成一个新的密钥</p>
        <el-button type="primary"
                   size="small"
                   @click="generateKey">生成密钥</el-button>
      </div>
      <div class="upload-key">
        <p>已有密钥,我要上传</p>
        <div class="upload-box">
          <el-upload class="upload-demo"
                     action="http://127.0.0.1:8888/api/key/upload/private.pem"
                     multiple
                     :limit="99"
                     :show-file-list="false"
                     :on-success="handleSuccess">
            <el-button icon="el-icon-upload"
                       size="small"
                       type="primary">上传私钥</el-button>
          </el-upload>
          <el-upload class="upload-demo"
                     action="http://127.0.0.1:8888/api/key/upload/public.pem"
                     multiple
                     :limit="99"
                     :show-file-list="false"
                     :on-success="handleSuccess">
            <el-button icon="el-icon-upload"
                       size="small"
                       type="primary">上传公钥</el-button>
          </el-upload>
        </div>
      </div>
    </div>

    <hr />
    <!-- 输入des密码 -->
    <div class="des-input">
      <p>输入des密码</p>
      <div class="form">
        <el-form :model="desForm"
                 :rules="rules"
                 ref="desForm"
                 class="desForm">
          <el-form-item prop="password">
            <el-input size="small"
                      v-model="desForm.password"
                      :maxlength=8
                      show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary"
                   size="small"
                   @click="saveDes">保存</el-button>
      </div>

    </div>
    <div class="key-container"
         v-if="showKey">
      <!-- 公钥 -->
      <div class="key-item">
        <div class="key-title">
          <p>公钥</p>
          <el-button size="mini"
                     @click="downloadKey('public')">下载公钥</el-button>
        </div>

        <div class="text-box">
          <el-input type="textarea"
                    :rows="10"
                    placeholder="公钥"
                    v-model="key.publicPem"></el-input>
        </div>
        <div class="modify">
          <el-button type="primary"
                     icon="el-icon-edit-outline"
                     round
                     @click="modify('public.pem')">修改公钥</el-button>
        </div>
      </div>

      <!-- 私钥 -->
      <div class="key-item">
        <div class="key-title">
          <p>私钥</p>
          <el-button size="mini"
                     @click="downloadKey('private')">下载私钥</el-button>
        </div>
        <div class="text-box">
          <el-input type="textarea"
                    :rows="10"
                    placeholder="私钥"
                    v-model="key.privatePem"></el-input>
        </div>
        <div class="modify">
          <el-button type="primary"
                     icon="el-icon-edit-outline"
                     round
                     @click="modify('private.pem')">修改私钥</el-button>
        </div>
      </div>
    </div>
    <p class="no-key"
       v-else>暂未生成密钥</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: { publicPem: '', privatePem: '' },
      showKey: false,
      desForm: {
        password: '',
      },
      rules: {
        password: [
          { required: true, message: '请输入你的des密码', trigger: 'blur' },
          { min: 8, max: 8, message: '长度在必须为8个字符', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getKey()
    this.desForm.password = localStorage.getItem('des')
  },
  methods: {
    saveDes() {
      this.$refs['desForm'].validate((valid) => {
        if (valid) {
          localStorage.setItem('des', this.desForm.password)
          this.$message({
            message: 'des密码保存成功',
            type: 'success',
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 获取key */
    getKey() {
      this.http.get('/getkey').then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.key = res.data.data
          this.showKey = true
        }
      })
    },
    /* 生成key */
    generateKey() {
      this.http.get('/generator').then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.showKey = true
          this.key = res.data.data
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
        }
      })
    },
    /* 下载 */
    downloadKey(fileName) {
      window.open(`http://127.0.0.1:8888/api/download/${fileName}.pem`, '_self')
    },
    /* 上传成功回调 */
    handleSuccess(res) {
      console.log(res)
      if (res.code == 0) {
        this.$message({
          message: res.msg,
          type: 'success',
        })
        this.getKey()
      } else {
        this.$message.error(res.msg)
      }
    },
    /* 修改key */
    modify(fileName) {
      let key
      if (fileName == 'private.pem') {
        key = this.key.privatePem
      } else {
        key = this.key.publicPem
      }
      this.http
        .post('/key/modify', { fileName: fileName, key: key })
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success',
            })
            this.getKey()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.genarate {
  width: 100%;
  height: 100%;
  background-color: #f9fafc;
}
h1 {
  color: #333;
  margin-bottom: 40px;
}
.key-option {
  width: 360px;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  .upload-key {
    .upload-box {
      width: 200px;
      display: flex;
      justify-content: space-between;
    }
  }
}

hr {
  margin-top: 40px;
  background-color: #aaa;
  border: none;
  height: 2px;
  opacity: 0.1;
  width: 80%;
}
.des-input {
  margin-top: 20px;
  width: 250px;
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-button {
      margin-left: 10px;
      height: 30px;
      width: 100px;
    }
  }
}
.key-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .key-item {
    width: 40%;
    .key-title {
      width: 150px;
      display: flex;
      justify-content: space-between;
      p {
        color: #666;
        font-size: 18px;
      }
    }
    .text-box {
      margin-top: 10px;
    }
    .modify {
      margin-top: 10px;
    }
  }
}
.no-key {
  margin-top: 50px;
  color: #666;
}
</style>