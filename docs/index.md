---
layout: home

hero:
  name: SMSerialport
  text: 通过串口发送短信

  image:
    src: /logo.svg
    alt: SMSerialport
    width: 200

  actions:
    - theme: brand
      text: 开始
      link: /zh/guide/what-is-smserialport

    - theme: alt
      text: GitHub
      link: https://github.com/imba97/smserialport

features:
  - icon: <span i-openmoji-japanese-symbol-for-beginner></span>
    title: 小白起步
    details: 刚起步的项目，参与上手难度不大，主打一个在摸索学习中进步

  - icon: <span i-tabler-message-2-code></span>
    title: 调用简单
    details: 只需要引入并通过简单的配置即可发送短信

  - icon: <span i-material-symbols-build-circle-outline-rounded></span>
    title: 现代构建工具
    details: 使用 unbuild 打包，支持多种模块化规范
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #5c9e31 30%, #fcea2b);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #5c9e31 50%, #fcea2b 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.image-src {
  opacity: 0.9 !important;
}

.dark {
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3e6a21 30%, #8c8002) !important;
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #3e6a21 50%, #8c8002 50%) !important; 

  .image-src {
    opacity: 0.5 !important;
  }
}
</style>
