<template>
  <div class="encrypt">
    <h1>加密</h1>
    <div class="encrypt-container">
      <div class="encrypt-item path">
        <p>通过绝对路径加密</p>
        <div class="encrypt-body">
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
                       @click="submitForm('ruleForm')">即刻加密 !</el-button>
          </div>
        </div>
      </div>
      <div class="encrypt-item upload">
        <p>上传文件加密</p>
        <div class="encrypt-body">
          <el-upload class="upload-demo"
                     drag
                     action="http://127.0.0.1:8888/api/encrypt/upload"
                     :data="{des:this.desPsd}"
                     :multiple="false"
                     :on-success="(res)=> { return encryptUpload(res)}">
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
  },
  methods: {
    /* 提交表单 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.encryptPath()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 通过路径加密 */
    encryptPath() {
      if (!this.desPsd) {
        this.$message.error('没有des密码')
        return
      }
      this.http
        .post('/encrypt/path', { path: this.ruleForm.path, des: this.desPsd })
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
    /* 上传加密 */
    encryptUpload(res) {
      this.$message({
        message: '上传成功，正在加密',
        type: 'success',
      })
      setTimeout(() => {
        window.open(
          `http://127.0.0.1:8888/api/download/encrypt/${res.data.name}`,
          '_self'
        )
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
h1 {
  color: #333;
  margin-bottom: 40px;
}
.encrypt-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.encrypt-item {
  width: 400px;
  p {
    color: #333;
  }
  .encrypt-body {
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