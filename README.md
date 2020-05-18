# admin-template
base on react &amp; dva-core &amp; redux &amp; react-router

## changeLog

- 增加`withHistory`插件对`effects`做统一注入`history`的处理, 方便在`effects`函数中调用`history`的功能

> 目前是修改了Action的基础模型, {type, payload} => {type, payload, history}, dva-core不支持修改effect模型内置的功能, 想要修改到{put, call}中需要对dva-core重写

- 替换 react-scripts-rewired

> react-scripts-rewired 不支持 react-scripts 3+ 导致项目启动报错, 选择carco作为替代库




### todos

- [ ] 优化项目产出体积
    - [ ] react/react-dom使用umd模式引用
    - [ ] 增加产出分析插件