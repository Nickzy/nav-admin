<template>
  <div :class="className ? 'selt_tag_wrap is_active' : 'selt_tag_wrap'"
    @click="handleClick"
    >
    <span class="tag_text">{{text}}</span>
    <span v-if="listLength !== 1" @click="close" class="isClose">×</span>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
    closable: {
      default: ''
    },
    index: {
      default: ''
    },
    className: {
      default: false
    },
    listLength: {
      default: 1
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
  },
  methods: {
    handleClick (e) {
      this.$emit('click', this.index, e)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>
.selt_tag_wrap {
  position: relative;
  display: inline-block;
  /* max-width: 24px; */
  padding: 6px 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 12px;
}
.is_active {
  border-color: blue;
}
.isClose {
  cursor: pointer;
  margin-left: 6px;
}
</style>
