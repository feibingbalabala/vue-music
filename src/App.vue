<template>
  <div id="app">
    <!-- 这里vue放弃了m-header的写法,尽量采用驼峰写法 -->
   <Mheader></Mheader>
   <Tab></Tab>
   <keep-alive>
    <router-view></router-view>
   </keep-alive>
   <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import Mheader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import player from 'components/player/player'

export default {
  components: {
    Mheader,
    Tab,
    player
  }
}
</script>

<style>

</style>
