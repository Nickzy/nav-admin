<template>
  <div class="wrap">
    <div style="display: flex; height: 100%">
      <div class="self_siderbar" :style="getSiderHeight">
        <div class="logo" style="background-image: url(../static/logo.png)"></div>
        <sider-menu :activeMenu="activeMenu" @getMenuData="getMenuData" :isCollapse="isCollapse" :menuList="dataObj.siderMenu[siderType]"></sider-menu>
      </div>
      <header :style="getHeaderWidth">
        <div>
          <div class="header_top" style="display: flex">
            <div class="toggle_show" @click="handleClick">
              <i class="menu-icon fa fa-reorder fa-fw"></i>
            </div>
            <div class="nav">
              <title-menu :menuList="dataObj.titleMenu" @getMenuType="getMenuType"></title-menu>
            </div>
            <div @click="setFull" class="full">
              <template @click="setFull" v-if="isFull">
                <i class="icon iconfont icon-anf11quanping" title="全屏显示"></i>
              </template>
              <template v-else>
                <i class="icon iconfont icon-cancel-full-screen" title="退出全屏"></i>
              </template>
            </div>
            <div class="user">
              <!-- <user-info :userName="'userName'" :userPhoto="'userPhoto'"></user-info> -->
            </div>
          </div>
          <div class="self_nav_tags" :style="`${headerWith - 104}px`" @mousewheel="mousewheel">
            <div class="tags_list" ref="tagsList" :style="getMoveLeft">
              <div v-if="!menuTagList.length" style="height: 30px"></div>
              <tag
                style="margin: 0 2px"
                @click="jumpRouter"
                @close="handleClose(index, item)"
                :className="item.isAddClass"
                :index="index"
                :listLength="menuTagList.length"
                :text="item.title"
                v-for="(item, index) in menuTagList"
                :key="index"
              />
            </div>
            <div class="button_more">
              <el-dropdown size="mini" trigger="click" split-button type="primary">
                更多
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>关闭其他</el-dropdown-item>
                  <el-dropdown-item>关闭全部</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </header>
    </div>
    <main>
      <div class="content"></div>
    </main>
  </div>
</template>
<script>
import titleMenu from './titleMenu'
import siderMenu from './siderMenu'
// import userInfo from './user-info.vue'
import tag from '../components/selfTag/tag'
import screenfull from 'screenfull'
export default {
  data () {
    return {
      isCollapse: false,
      isFull: false,
      menuTagList: [],
      activeMenu: '',
      headerWith: 0,
      siderHeight: 0,
      tagsListMoveLeft: 0,
      dataObj: {
        titleMenu: [
          {
            title: '处理中心',
            type: 'left'
          },
          {
            title: '我的工作台',
            type: 'center'
          },
          {
            title: '订单管理',
            type: 'right'
          }
        ],
        siderMenu: {
          left: [
            {
              title: '处理中心',
              sub: [
                {
                  title: '处理一'
                },
                {
                  title: '处理二'
                },
                {
                  title: '处理三'
                }
              ]
            }
          ],
          center: [
            {
              title: '我的工作台',
              sub: [
                // {
                //   title: '工作一'
                // },
                // {
                //   title: '工作二'
                // },
                // {
                //   title: '工作三'
                // }
              ]
            }
          ],
          right: [
            {
              title: '订单管理',
              sub: [
                {
                  title: '订单一'
                },
                {
                  title: '订单二'
                },
                {
                  title: '订单三'
                }
              ]
            }
          ]
        }
      },
      siderType: 'left'
    }
  },
  mounted () {
    let _this = this
    let clientWidth = document.body.getBoundingClientRect().width
    let clientHeight = window.innerHeight
    this.headerWith = clientWidth - 200
    this.siderHeight = clientHeight
    window.addEventListener('resize', _this.setMaxHeight)
  },
  computed: {
    getHeaderWidth () {
      return {
        width: `${this.headerWith}px`
      }
    },
    getSiderHeight () {
      return {
        height: `${this.siderHeight}px`
      }
    },
    getMoveLeft () {
      return {
        left: `${this.tagsListMoveLeft}px`
      }
    }
  },
  components: {titleMenu, siderMenu, tag},
  methods: {
    setFull () {
      this.isFull = !this.isFull
      screenfull.toggle()
    },
    getMenuType (type) {
      let list = this.dataObj.siderMenu[type]
      this.siderType = type
      if (list.length === 1 && !list[0].sub.length) {
        this.getMenuData(list[0], '0')
      }
    },
    mousewheel (e) {
      let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
      let width = this.$refs.tagsList.clientWidth
      let left = this.tagsListMoveLeft
      let Nwidth = (this.headerWith - 104)
      if (width + 35 > Nwidth) {
        if ((width + left) < Nwidth && delta < 0) {
          return
        }
        if (left > 0 && delta > 0) {
          return
        }
        this.tagsListMoveLeft += delta * 35
      }
    },
    setMaxHeight () {
      // let clientHeight = document.body.getBoundingClientRect().height
      let clientWidth = document.body.getBoundingClientRect().width
      this.headerWith = clientWidth - 200
    },
    setTagWheelWidth () {
      let width = this.$refs.tagsList.clientWidth
      let Nwidth = (this.headerWith - 104)
      if ((width - 50) < Nwidth) {
        this.tagsListMoveLeft = 0
      }
    },
    getMenuData (item, key) {
      console.log(item)
      let status = true
      this.menuTagList.forEach((itemM, index) => {
        if (itemM.title === item.title) {
          status = false
          this.getIsAddClass(index)
          return true
        }
      })
      if (status) {
        this.getIsAddClass()
        this.menuTagList.push({...item, isAddClass: true})
        this.activeMenu = key
      }
    },
    handleClick () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.headerWith += 135
      } else {
        setTimeout(() => {
          this.headerWith -= 135
        }, 300)
      }
    },
    handleClose (index) {
      if (!index && this.menuTagList[index].isAddClass) {
        this.getIsAddClass(1)
      }
      if (index && this.menuTagList[index].isAddClass) {
        this.getIsAddClass(index - 1)
      }
      this.menuTagList.splice(index, 1)
      this.setTagWheelWidth()
      this.activeMenu = ''
    },
    getIsAddClass (index) {
      this.menuTagList = this.menuTagList.map((item, itemIndex) => {
        item.isAddClass = false
        if (index === itemIndex) {
          item.isAddClass = true
        }
        return item
      })
    },
    jumpRouter (index, e) {
      console.log(e.target.className)
      let arr = this.activeMenu.split('-')
      if (e.target.className === 'isClose') {
        return
      }
      this.getIsAddClass(index)
      if (arr[0]) {
        this.activeMenu = `${arr[0]}-${index}`
      }
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}
.wrap {
  height: 100%;
}
.full{
  margin-right:50px;
  cursor: pointer;
  background: blue;
}
.full i{
    transition: 0.3s;
    font-size:30px;
    font-weight: bold;
    line-height:60px;
    color:#ddd;
  }
.full:hover i{
    color:#fff;
}
.self_siderbar {
  /* width: 20%; */
  height: 100%;
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;
}
.header_top {
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
}
.self_nav_tags {
  position: relative;
  padding: 5px 0;
  height: 30px;
  overflow: hidden;
  padding-right: 104px;
  /* display: flex; */
  border-bottom: 1px solid #e6e6e6;
}
.tags_list {
  position: absolute;
  top: 2px;
  padding: 2px 10px;
  overflow: visible;
  white-space: nowrap;
}
.button_more {
  position: absolute;
  background: #ffffff;
  right: 0;
  top: 0;
  z-index: 1;
  padding: 6px 10px;
  box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
}
header {
  width: 80%;
  right: 0;
}
.logo {
  height: 60px;
  background-color: lightblue;
  background-repeat: no-repeat;
  background-position: 4px 0;
}
.toggle_show{
  background-color: lightblue;
  width: 50px;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  color: #eef1f6;
  padding: 10px;
  text-align: center;
  line-height: 40px;
}
.fa{
  zoom: 1.3;
  margin: 16px 12px;
}
</style>
