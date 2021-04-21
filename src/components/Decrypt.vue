<template>
  <div class="decrypt">
    <h1>解密</h1>
    <div class="decrypt-container">
      <div class="decrypt-item path">
        <p>通过绝对路径解密</p>
        <div class="decrypt-body">
          <div class="form">
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="文件路径"
                            prop="path">
                <el-input v-model="ruleForm.path"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">即刻解密 !</el-button>
          </div>
        </div>
      </div>
      <div class="decrypt-item upload">
        <p>上传文件解密</p>
        <div class="decrypt-body">
          <el-upload class="upload-demo"
                     drag
                     action="http://127.0.0.1:8888/api/decrypt/upload"
                     :data="{des:this.desPsd}"
                     :multiple="false"
                     :on-success="(res)=> { return decryptUpload(res)}">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      desPsd: '',
      ruleForm: {
        path: '',
      },
      rules: {
        path: [
          { required: true, message: '请输入文件路径', trigger: 'blur' },
          { min: 5, message: '长度太短', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.desPsd = localStorage.getItem('des')
    if (!this.desPsd) {
      this.$message.error('没有des密码')
    }
  },
  methods: {
    /* 提交表单 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.decryptPath()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 通过路径解密 */
    decryptPath() {
      this.http
        .post('/decrypt/path', { path: this.ruleForm.path, des: this.desPsd })
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.msg,
              type: 'success',
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    /* 上传解密 */
    decryptUpload(res) {
      console.log(res)
      if (res.code == 0) {
        this.$message({
          message: '上传成功，正在解密',
          type: 'success',
        })
        setTimeout(() => {
          window.open(
            `http://127.0.0.1:8888/api/download/decrypt/${res.data.name}`,
            '_self'
          )
        }, 1000)
      } else {
        this.$message.error(res.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
h1 {
  color: #333;
  margin-bottom: 40px;
}
.decrypt-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.decrypt-item {
  width: 400px;
  p {
    color: #333;
  }
  .decrypt-body {
    margin-top: 50px;
  }
}
.path {
  .form {
    .el-button {
      margin-top: 20px;
    }
  }
}
.upload {
  margin-right: 100px;
}
@media (max-width: 1720px) {
  .upload {
    margin-right: 0;
  }
}
</style>