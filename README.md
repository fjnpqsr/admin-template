# admin-template
base on react &amp; dva-core &amp; redux &amp; react-router

## changeLog

- 增加`withHistory`插件对`effects`做统一注入`history`的处理, 方便在`effects`函数中调用`history`的功能

> 目前是修改了Action的基础模型, {type, payload} => {type, payload, history}, dva-core不支持修改effect模型内置的功能, 想要修改到{put, call}中需要对dva-core重写

- [ ]todo rebuild with webpack