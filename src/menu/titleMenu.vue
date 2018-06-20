<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="(item, index) in menuList" :key="index" :index="`${index}`">{{item.title}}</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  props: {
    menuList: {
      default: []
    }
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('getMenuType', this.menuList[key].type)
    }
  }
}
</script>
