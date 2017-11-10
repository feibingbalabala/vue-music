<template>
  <div id="app">
    <!-- 这里vue放弃了m-header的写法,尽量采用驼峰写法 -->
   <Mheader></Mheader>
   <Tab></Tab>
   <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Mheader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  components: {
    Mheader,
    Tab
  }
}
</script>

<style>

</style>
