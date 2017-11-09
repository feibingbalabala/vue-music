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

初始化项目：
1、npm instal --goabal vue-cli 全局安装cli脚手架。
2、npm init webpack vue-music 建立一个项目文件（生成一个vue-music的文件夹）,之后跳出的都直接回车。
3、cd vue-music 后执行 npm install 下载依赖
4、项目用的是stylus 所注意package.json需要修改
      devDependencies下新增
      "stylus": "^0.54.5",
      "stylus-loader": "^2.1.1"。
    .eslintrc.js下新增
      // 不检查js文件最后一行的空格
      'eol-last': 0,
      // 在js的function 左侧不需要添加空格
      'space-before-function-paren': 0。
    配置一个路径别名
    在build/webpack.base.conf.js中resolve.alias添加新的别名，其中resolve函数中__dirname为当前目录
