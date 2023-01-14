<template>
  <div id="app">
    <main-tab-bar/>
    <router-view/>
  </div>
</template>

<script>
// 导入组件
import MainTabBar from './components/base/layout/tabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
  @import './assets/css/base/base.css';
  @import './assets/css/base/app.css';
</style>
