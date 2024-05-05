# smserialport

一个串口 SMS 库，可通过简单设置即可调用串口设备发送短信。

# 硬件

- A7680C 模块
- CH340 USB to TTL

# 使用

`sender` 是可选的，如果不设置默认会自动获取，但有可能获取不到

```typescript
import { SMSerialport, MainlandChinaAdapter } from "smserialport";

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

接收短信

![](./images/received-message.png)
