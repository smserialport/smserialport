---
title: 快速开始
description: 通过串口发送短信
---

# 快速开始

## 硬件

- A7680C 模块
- CH340 USB to TTL

<div flex="~ lt-md:col" gap-5>
  <img src="/hardware/A7680C.jpg" w="60 lt-md:full" rounded-xl />
  <img src="/hardware/CH340.jpg" w="60 lt-md:full" rounded-xl />
</div>

没想到吧，卡在这儿了

##  安装

::: code-group

```sh [npm]
$ npm add smserialport
```

```sh [pnpm]
$ pnpm add smserialport
```

```sh [yarn]
$ yarn add smserialport
```

```sh [bun]
$ bun add smserialport
```

:::

## 使用

```typescript
import { SMSerialport, MainlandChinaAdapter } from 'smserialport'

const smserialport = new SMSerialport(MainlandChinaAdapter)

smserialport.config({
  path: "COM9",
  baudRate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
})

// 方式一
smserialport.send('15*******97', 'ABC ### 测试')

// 方式二
smserialport.send({
  // 短信发送者
  sender: '17*******97',
  // 短信接收者
  receiver: '15*******97',
  // 短信内容
  message: 'ABC ### 测试'
})
```

> [!TIP]
>
> 在 **设备管理器中** 查看串口号
>
> 如果 SIM 卡中存在手机号，则不需要设置发送者
