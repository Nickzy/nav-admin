<template>
  <div class="userInfo">
    <el-dropdown trigger="hover">
      <span class="el-dropdown-link userInfo-inner">
        <i class="el-icon-caret-bottom el-icon--right" style="float:right;line-height:40px;margin-left:10px;"></i>
        <span>{{userName}}</span>
        <img :src="userPhoto" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item divided @click.native="updatePassword">修改密码</el-dropdown-item>
        <el-dropdown-item divided @click.native="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
      <!--<span  slot="dropdown"></span>-->
    </el-dropdown>
    <!--<el-button type="primary"  class="exit"><i class="fa fa-power-off"></i></el-button>-->
  </div>
</template>
<script>
  // import {loginResource} from '@/resource/loginResource.js'
  export default {
    props: {
      userName: String,
      userPhoto: String
    },
    data: function () {
      return {
        fromList: {
          oldPassword: '',
          newPassword: ''
        }
      }
    },
    components: {},
    methods: {
      exit () {
        this.$confirm('确认退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('exit')
        }).catch(() => {

        })
      },
      updatePassword () {
        this.fromList.oldPassword = ''
        this.fromList.newPassword = ''
        const h = this.$createElement
        let self = this
        this.$msgbox({
          title: '修改密码',
          message: h('div', null, [
            h('p', {
              style: {width: '100%'}
            }, [
              h('label', {
                style: {width: '200px', height: '32px', lineHeight: '40px', textAlign: 'right', fontSize: '14px'}
              }, '请输入旧密码'),
              h('input', {
                style: {width: '95%', height: '32px', borderRadius: '5px', padding: '0 10px', border: '1px solid #aaa', outline: 'none'},
                domProps: {
                  type: 'password',
                  placeholder: '输入旧密码',
                  value: self.fromList.oldPassword
                },
                on: {
                  input: function (event) {
                    self.fromList.oldPassword = event.target.value
                    self.$emit('input', event.target.value)
                  }
                }
              }, [])
            ]),
            h('p', {
              style: {width: '100%'}
            }, [
              h('label', {
                style: {width: '200px', height: '32px', lineHeight: '40px', textAlign: 'right', fontSize: '14px'}
              }, '请输入新密码'),
              h('input', {
                style: {width: '95%', height: '32px', borderRadius: '5px', padding: '0 10px', border: '1px solid #aaa', outline: 'none'},
                domProps: {
                  type: 'password',
                  placeholder: '输入新密码',
                  value: self.fromList.newPassword
                },
                on: {
                  input: function (event) {
                    self.fromList.newPassword = event.target.value
                    self.$emit('input', event.target.value)
                  }
                }
              }, [])
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: function (action, instance, done) {
            if (action === 'confirm') {
              if (self.fromList.oldPassword.trim().length === 0) {
                return this.$notify.error({
                  title: '错误',
                  duration: 2000,
                  message: '旧密码不能为空'
                })
              } else if (self.fromList.newPassword.trim().length === 0) {
                return this.$notify.error({
                  title: '错误',
                  duration: 2000,
                  message: '新密码不能为空'
                })
              } else if (self.fromList.oldPassword === self.fromList.newPassword) {
                return this.$notify.error({
                  title: '错误',
                  duration: 2000,
                  message: '旧密码和新密码不能相同'
                })
              }
              loginResource.updatePassword(self.fromList).then(res => {
                if (res.data.status === 0) {
                  this.$message({
                    showClose: true,
                    message: '恭喜你，密码修改成功',
                    type: 'success'
                  })
                  done()
                } else {
                  return this.$notify.error({
                    title: '错误',
                    duration: 2000,
                    message: res.data.message
                  })
                }
              }, res => {
                return this.$notify.error({
                  title: '错误',
                  duration: 2000,
                  message: res.data.message
                })
              })
            } else {
              self.fromList.oldPassword = ''
              self.fromList.newPassword = ''
              done()
            }
          }
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../assets/less/color.less";
  .userInfo{
    text-align: right;
    height: 100%;
    padding-right: 5px;
    float: right;

    .exit{
      float: right;
      width: 40px;
      height: 40px;
      margin: 10px 0px;
      border-radius: 20px;
      padding: 0;
      font-size: 20px;
      color: #eeeeee;
    }
    .el-dropdown{
      height: 100%;
      &:hover{
        background-color: @color-header-light;
      }
    }

    .userInfo-inner {
      cursor: pointer;
      color:#fff;
      padding:10px 10px 10px 10px;
      display: inline-block;

      span{
        height: 40px;
        line-height: 40px;
        float: right;
        display: inline-block;
        margin: 0;
        padding-left: 5px;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        float: right;
      }
    }
  }
</style>

