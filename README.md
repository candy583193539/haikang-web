# scigoo-portal

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 目录结构
scigoo-portal --门户网站
|
├── src --源码
|  |
|  ├──api --接口相关
|  |
|  ├──assets --静态资源
|  |  |
|  |  ├──css --放置css 文件
|  |  |
|  |  ├──img --放置图片文件
|  |
|  ├──common --公共的js文件
|  |  |
|  |  ├──const --例如抽取公共的常量
|  |  |
|  |  ├──utils --例如抽取公共的方法
|  |
|  ├──components --组件（主要放置公共的组件）
|  |  |
|  |  ├──base --基线 完全公共组件 （不仅适用于当前项目 还可以试用其它项目 类似基线）
|  |  |
|  |  ├──content --业务相关的公共组件 （仅针对于当前项目）
|  |
|  ├──config --配置文件存放位置 
|  |
|  ├──network --网路相关 
|  |
|  ├──router --路由相关 
|  |
|  ├──store --VueX （状态管理 ）
|  |
|  ├──views --视图 （主要放置一些页面 ）

