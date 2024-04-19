# simple-serialport-gsm

一个简单的串口 GSM 库

# 使用

```js
import { Serialport, MainlandChinaAdapter } from "simple-serialport-gsm";

const serialport = new Serialport(MainlandChinaAdapter)

serialport.config({
  // 短信发送者
  sender: '17*******97',
  // 短信接收者
  receiver: '15*******97',
  // 短信内容
  message: 'ABC ### 测试'
})

serialport.send({
  // 串口
  path: "COM9",
  baudRate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
})
```

接收短信

![](./images/received-message.png)
