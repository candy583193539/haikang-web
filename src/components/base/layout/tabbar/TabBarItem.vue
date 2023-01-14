<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 导航图标 -->
    <slot name="tab-bar-item-icon"></slot>
    <slot name="tab-bar-item-icon-active"></slot>
    <!-- 导航标题是否激活 -->
    <div :class='activeClass'>
      <!-- 导航标题 -->
      <slot  name="tab-bar-item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    // activeColor: {
    //   type: String,
    //   default: 'blue'
    // },
  
  },
  data () {
    return {
      // isActive: true
    }
  },
  // 计算属性
  computed: {
    isActive () {
      // /home -> item1(/home) = true
      // /home -> item1(/category) = false
      return this.$route.path.indexOf(this.path) !== -1 // 找到了就 不等于-1
    },
  
    activeClass () {
      return this.isActive ? 'activeClass':''
    },

  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
     
    }
  }
}
</script>
<style>
.activeClass span{
border-bottom: 2px solid #1a73e8;
color: #1a73e8;
padding: 10px;
/* font-weight: 600; */
}
</style>
