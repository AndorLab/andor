# andor

> 山脉定制组件集

## **CoC**

* 组件必须写在/src/components下
* 组件默认在正常dom流中，定位问题通过传参解决（className）
* 组件中不能引入大于8192字节的图片、音视频文件，尽量使用简单的svg,且需要将图片接口暴露，供外部传参
* 每个组件都要有示例，写在example下
* 注释采用storybook的形式
