# simple-zip-upload

一个简单的前端打包压缩上传工具

可以一键压缩指定目录并上传到服务器并把下载链接推送到钉钉

可自动维护本地及线下压缩包，非当天的自动删除

# 安装

```
pnpm i -D simple-zip-upload
```

# 导入

```javascript
import ZipUpload from 'simple-zip-upload'
```

# 配置

```javascript
const ZipUpload = require('simple-zip-upload')
const path = require('path')
const fs = require('fs')

const ZipUploadConfig = {
  sftpOptions: {
    // SFTP 连接信息
    connect: {
      host: '1.2.3.4',
      port: 22,
      username: 'root',
      privateKey: fs.readFileSync('C:\\Users\\imba97\\.ssh\\id_rsa')
    },

    // 必填，上传的远程目录
    remoteDir: '/www/download/upload'
  },

  // 应用名，唯一名称，会拼接在压缩文件名
  app: 'simple-zip-upload',

  // 版本号填充“0”的个数，可选，默认 2
  fill: 3,

  // 压缩目标文件夹
  zipTargetDir: 'dist',

  // 本地压缩文件存放目录
  zipFileDir: 'build',

  // 压缩文件下载连接，最后会与文件名拼接
  host: 'https://download.imba97.cn/upload/',

  // 钉钉推送卡片信息
  cardInfo: {
    title: '测试发布',
    subTitle: '没啥事就是测试一下',

    // 可选 默认是：
    // 版本 20221027005
    // 大小 1.00M
    // 打包日期 2022-10-27 23:57:31
    body(cardInfo) {
      return `
自定义内容
开头顶格写，不然会有空格
版本 ${cardInfo.version}
大小 ${cardInfo.size}
打包日期 ${cardInfo.date}`
    }

    // 可以是字符串
    // body: '自定义内容'
  },

  // 钉钉连接 token、secret
  dingTalk: {
    accessToken: '',
    secret: ''
  }
}
```

# 使用

## 普通

```javascript
// 普通
new ZipUpload(ZipUploadConfig).start()
```

## Webpack

```javascript
// ...
{
  plugins: [new ZipUpload(ZipUploadConfig)]
}
```

## vue.config.js

```javascript
// ...
{
  // ...
  chainWebpack(config) {
    // 添加插件
    config
      .plugin('ZipUploadPlugin')
      .use(ZipUpload)
      .tap(() => [ZipUploadConfig])
  },
  // ...
}
```
