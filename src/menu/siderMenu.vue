<template>
  <el-menu :default-active="activeMenu" @select="handleSelect" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <template v-for="(item, index) in menuList" v-if="menuList.length">
      <el-menu-item v-if="!item.sub.length" :key="index" :index="`${index}`">
        <i class="el-icon-setting"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-submenu v-else :key="index" :index="`${index}`">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem, subIndex) in item.sub" :index="`${index}-${subIndex}`"  :key="subIndex+ 'sub'">{{subItem.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
export default {
  props: {
    menuList: {
      default: []
    },
    activeMenu: {
      default: ''
    },
    isCollapse: false
  },
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key) {
      // console.log(this.menuList)
      let arr = key.split('-')
      let index = arr[0]
      let subIndex = arr[1]
      if (subIndex >= 0) {
        this.$emit('getMenuData', this.menuList[index].sub[subIndex], key)
      }
    }
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  border: 0;
}
</style>
