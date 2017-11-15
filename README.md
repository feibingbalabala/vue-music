# vue-music

> 音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
``` bash
初始化项目：
1、npm instal --goabal vue-cli 全局安装cli脚手架。
2、npm init webpack vue-music 建立一个项目文件（生成一个vue-music的文件夹）,之后跳出的都直接回车。
3、cd vue-music 后执行 npm install 下载依赖
4、项目用的是stylus 所注意package.json需要修改
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
    配置一个路径别名
    在build/webpack.base.conf.js中resolve.alias添加新的别名，其中resolve函数中__dirname为当前目录
路由配置：
新建了五个组件(singer,recommend,search,rank,tab)
修改了路由的配置，
  1、routes: [
    {
      // 根目录，页面默认进入的
      path: '/',
      rediect: 'Recommend'
    }
  ]。
  2、tab组件样式中添加.router-link-active作为页面跳转时选中的导航栏样式。
轮播图组件制作：
  注意click事件和faskclick的冲突，
  mounted：是类似jq的ready,但是DOM生成的时候，由于数据是异步加载经来的所以存在，异步加载的dom还没执行，用setTimeOut做个延迟。
  destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。(组件销毁，我的理解是在可视区域看不到了。)
```