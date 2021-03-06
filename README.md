# vue-music

> 音乐播放器

## 初始化项目：
1. npm instal --goabal vue-cli 全局安装cli脚手架。
2. npm init webpack vue-music
3. 建立一个项目文件（生成一个vue-music的文件夹）,之后跳出的都直接回车。
4. cd vue-music 后执行 npm install 下载依赖
5. 项目用的是stylus 所注意package.json需要修改<br/>
```
dependencies下新增
  "babel-runtime": "^6.0.0", // 语法转义
  "fastclick": "^1.0.6" // 移动端点击300ms延迟问题。
  "jsonp": "0.2.1", // json插件
  "better-scroll": "^0.1.15"
  devDependencies下新增
  "stylus": "^0.54.5",
  "stylus-loader": "^2.1.1",
  "babel-polyfill": "^6.2.0",// es6语法转义。
.eslintrc.js下新增
  // 不检查js文件最后一行的空格
  'eol-last': 0,
  // 在js的function 左侧不需要添加空格
  'space-before-function-paren': 0。
```
## 配置一个路径别名
    在build/webpack.base.conf.js中resolve.alias添加新的别名，其中resolve函数中__dirname在node中为当前目录
## 路由配置：
新建了五个组件(singer,recommend,search,rank,tab)。<br/>
修改了路由的配置，
```
routes: [
    {
      // 根目录，页面默认进入的
      path: '/',
      rediect: 'Recommend'
    }
  ]。
```
tab组件样式中添加.router-link-active作为页面跳转时选中的导航栏样式。

## 轮播图组件制作：
注意click事件和faskclick的冲突，这里如果click事件一定需要派发的话，可以在点击区域加上**class="needsclick"** 这样Fastclick就不会去监听这个事件.<br/>

### mounted：
是类似jq的ready,但是DOM生成的时候，由于数据是异步加载经来的所以存在，异步加载的dom还没执行，用setTimeOut做个延迟。他的子组件DOM是否加载和父组件的mounted无关如果需要dom完全加载请使用"$nextTick(() => {})"。

### destroyed：
Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。(组件销毁，我的理解是在可视区域看不到了。

### created()
在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，DOM元素并没有生成，在mouted之前。

## 数据歌单列表：
**getDiscList**是数据分发的接口(我的理解可以作为一个前端解决跨域的方案，有待考证)。<br/>

**v-html**就像innerHTML方法直接将HTML插入。<br/>

css中使用了box-align:center，这个属性可以让内部元素垂直居中，不支持ie
      flex-direction: column；justify-content: center元素纵向居中（属于flex的一种方式）。

## scroll组件抽象：
**better-scroll**插件需要获取页面的高度，由于页面的高度是由数据和图片高度撑开的所以要注意判断图片和异步数据是否过来，在图片添加了load事件，用一个变量控制了load的加载次数。

### Loading：
vue中loading的制作会比想象中的简单，在jq中，同步数据你要判断页面的高度，load事件，用计时器控制延迟加载。vue中只需要判断加载数据的长度就可以了，如果数据的长度没有获取到，继续loading。

## listview组件：
组件的使用：如果引用时采用的是ListView，那在template中就需要使用<list-view>。如果只是Listview，那<listview>就可以了，注意大小写。

### watch
在watch中检测data的参数，可以使用data中的参数名称+(newVal, oldVal)括号内写入型参可以传入data中值的变化。
```
export default {
    data(){
        return {
            result: '',
            data: {
                status: ''
            }
        }
    },
    watch:{
        result(newVal, oldVal) {
            newVal为新值，
            oldVal为旧值。
        },
        // 检测对象，
        // 还可以直接watch data，使用deep:true来深度观察
        'data.status':{
            handler: (newVal,oldVal) => {
                //要执行的任务
            },
            // 深度观察
            deep:true
        }
    }
}
```

### ES6字符串模版
```
`translate3d(0, ${fixedTop}px, 0)`es6的字符串模版。注意左右两边符号。
```
## 配置子路由：
src/router/index.js下的singer配置子路由。(冒号是vue的绑定数据)
```
  import SingerDetaul from 'components/singer-detail/singer-detail'
  routes: [
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id', //子路由的路径
          component: SingerDetaul //子路由的模版
        }
      ]
    }
  ]
```
js的**页面跳转**可以使用this.$router.push({path: '路径'})。<br/>
**返回**上一个页面this.$router.back()。

## vuex：
把信息，状态保存在同一个内存state里面，然后映射到vue的组件上，然后dispatch一个acition(用户的各种操作)，然后commit一个mutation，然后又反映到state上。也可以不通过dispatch直接commit一个mutation。

**解决：**
1. 多个组件的数据共享。
2. 路由中复杂数据传输。

**目录结构：**
```
 src/store
    index.js // 入口文件
    state.js // 状态管理
    mutation.js // mutation修改的操作
    mutation-types.js // mutation相关的字符串常量
    action.js // 异步操作或是mutation封装（一个操作需要调用多个mutaition的时候）
    getters.js // 对state做一些映射,希望从getters中取state的参数
```
**vuex的使用逻辑**
1. 在state.js定义原始数据；
2. 在getters.js做一个数据的映射，根据state.js做一个计算或是复杂的判断逻辑；
3. 定义mutation-types.js需要哪些修改动作；
4. 在mutation.js对接收到的数据，对state进行修改。

**vuex的debug模式**
```
    线下调试，通过NODE_ENV来指定环境，如果不是production就是生产环境
    const debug = process.env.NODE_ENV !== 'production'

    export default new Vuex.store({
      getters,
      strict: debug
    })

    import createLogger from 'vuex/dist/logger'
      每次通过mutation修改state时会在控制台打印出对应的东西。
    import {mapMutations} from 'vuex'
      vuex的语法糖（这种内置的方法就称为语法糖，我是这么理解的，有待考证）
      methods: {
        ...mapMutations({
          setSinger: 'SET_SINGER' // 设置mutation
        })
      },
      computed: {
        ...mapGetters([ // 得到mutation
          'fullScreen',
          'playList',
          'currentSong'
        ])
      },
      拓展运算符的方式做对象映射，使代码更简洁
```
在singer-detail，中由于singer.id是通过vuex传输的，一旦用户强制刷新了页面。就会导致内存中的vuex保存singer.id消失，而找不到，有一种做法是直接保存为路由参数，这样在赋值的时候就可以this.$router.param.id去查找。

## export const singer = state => state.singer 
尖头函数的缩写，传递state return state.singer
    
## import * as getters from './getters'
这样就可以在下面使用**getters.方法**去调用。

## 音乐播放器的使用
this.$emit('select', item, index)对外派发一个事件。父元素可监听这个事件。

## 动画的使用(player.vue)

使用了一个第三方js的动画库 create-keyframe-animation<br/>
这里用到了vue的js动画钩子我觉得可以理解成jq的animate<br/>
    @enter="enter"<br/>
    @after-enter="afterEnter"<br/>
    @leave="leave"<br/>
    @after-leave="afterLeave"<br/>
  便可以在methods: {}中使用，其中enter(el, done)和leave(el, done)中done作为一个回调函数，执行完enter后会执行after-enter，leave也一样。this.$refs.cdWrapper.addEventListener('transitionend', done)使用transitionend监听done的执行。
  
## 阻止事件的冒泡
@click.stop=''，出现场景父及元素绑定一个事件，子级元算绑定一个事件，点击子级元素就可能会触发父及元素的事件，所以在自己元素的click.stop就可以阻止事件的冒泡(就像自定义下拉框一样，点击其他区域，下拉框收起来)。

## computed和watch的区别
[参考文献](https://segmentfault.com/q/1010000009263244)<br/>
如果一个值依赖多个属性（多对一），用computed肯定是更加方便的。<br/>
如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化（一对多），用watch更加方便一些。

## svg
```  
<svg width="画布大小" height="画布大小" stroke-dasharray="画布的描边" stroke-dashpffset="描边的偏移" viewBox="舞台大小理解成百分比单位就行">

```
<progressCircle radius="32" :percent="percent">是否有冒号取决于这个值是不是一个变量，这样传递的话会出现传递数字，被子组件解析成字符串，因为vue会把这个直接导成字符串，那就需要:radius="radius" data() {return {radius: 32}}，这样就可以变成number类型的。

## 随机数
```
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    // 交换歌曲位置，并没有去重
    export function shuffle(arr) {
      for (let i = 0; i < arr.length; i ++) {
        let j = getRandomInt(0, 1)
        let t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
      }
    
      return arr
    }
```
## $refs.$el 这个DOM的取法

## mixins
### mixins多个组件需要运行同一个函数时，可以使用这个，
```
  在common/js下定义一个 minxin.js内容如下。
  import {mapGetters} from 'vuex'
  export const playlistMixin = {
    computed: {
      ...mapGetters([
        'playList'
      ])
    },
    mounted() {
      this.handlePlayList(this.playList)
    },
    activated() {
      this.handlePlayList(this.playList)
    },
    watch: {
      playList(newVal) {
        this.handlePlayList(newVal)
      }
    },
    methods: {
      handlePlayList() {
        throw new Error('component must implenent handlePlyaList method')
      }
    }
  }
```
### 在组件中引用
  import {playlistMixin} from '../../common/js/mixin'
### 注册
  mixins: [playlistMixin],
  之后在函数执行上面那些生命周期时他就会去调用。然后在组件中的methods方法需要加入handlePlayList()函数他就可以去引用，相同源的函数会去覆盖掉。这样原先定义中的就会抛出这个异常，如果在组件中有定义就可以覆盖这个异常。

## 组件中传递参数
在组件中传递参数例如
```
<template title="文字" :title1="h1">
```
  第一个没有冒号，因为他是直接把文本放入，<br/>
  第二个有冒号，因为h1是一个变量
  
## 函数的截流(common/js/ytil.js)
```
    export function debounce(func, delay) {
        let timer
        return function(...args) {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }
```
传入一个函数，再穿出一个函数。

## slice()
### 定义
slice() 方法可从已有的数组中返回选定的元素。
### 用法
arrayObject.slice(start,end)
### 返回值
返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

## split()
### 定义
split() 方法用于把一个字符串分割成字符串数组。
### 用法
stringObject.split(separator,howmany)
### 返回值
一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括 separator 自身。<br/>
但是，如果 separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的文本）。

## splice()
### 定义
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。(该方法会改变原始数组。)
### 用法
arrayObject.splice(index,howmany,item1,.....,itemX)
### 说明
splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。<br/>
如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

## pop()
### 定义
pop() 方法用于删除并返回数组的最后一个元素。
### 用法
arrayObject.pop()
### 说明
pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。

## 阻止点击事件冒泡
```
    <div @click.stop></div>
```
后面不跟回调函数，这样可以直接阻止事件冒泡

## 项目打包
项目build好之后需要跑这个项目(利用express启动路由)。
1. 在根目录新建文件，prod.server.js
2. 在config/index.js下的build添加port参数(端口号)
3. 设置静态目录：app.use(express, express.static('./dist'))
4. node prod.server.js 搞定

## 项目优化
###  路由懒加载
在router/index.js下修改项目组件的引入
```
    require.ensure() webpack特有的路由懒加载，但最后会被import所取代
    
    const Recommend = (resolve) => {
      import('components/recommend/recommend').then((moudule) => {
        resolve(moudule)
      })
    }
```

## 项目升级
 修改package.json文件的版本，然后npm install，注意'vue-template-compiler'的版本必须和vue的版本相同。

## 移动端调试插件(vconsole)
  在package.json 的devDependencies下添加"vconsolve": "^2.5.2",也就是开发时依赖的包。
  然后在main.js包下引入import（这里我遇到了个小点，import任何组件都必须在业务逻辑之前）。
  很奇葩，不知道为啥引用没用，也没有报错。
  
## 坑
1. 抓QQ音乐歌词这边真是遇到一个神坑，不知道为啥QQ音乐的的参数改变了，原先的做法是传songmid: mid，现在是传musicid: id。
2. 有一个点微信在后台的时候JS是不会执行的，这个坑目前的做法是添加计时器。
3. 歌单页面制作这里有一个坑点，就是接口又被屏蔽了，然后只能只能使用axios去掉自己的dev-server.js的接口。
    这里我用了比较恶心的方式，就是用字符串切割把JSONP中括号的内容切割下来
    如果接口调整了回调函数，那这个地方又要修改。