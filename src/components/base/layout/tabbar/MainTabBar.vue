<template>
  <div id="app">
    <tab-bar>
      <!-- activeColor="red" 激活后的颜色-->
      <tab-bar-item path="/person">
        <div slot="tab-bar-item-text"><span>人员</span></div>
      </tab-bar-item>
      <span class='middle_line'></span>
      <tab-bar-item path="/vehicle">
        <div slot="tab-bar-item-text"><span>车辆</span></div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
// 导入组件
import TabBar from "./TabBar";
import TabBarItem from "./TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar, // 注册组件
    TabBarItem,
  },
  data() {
    return {};
  },
  methods: {
 
  },
};
</script>
<style scoped>
.middle_line {
    line-height: 50px;
    background: #ccc;
    width: 2px;
    margin: 10px 0;
}
</style>
