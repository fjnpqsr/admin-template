# admin-template
base on react &amp; dva-core &amp; redux &amp; react-router

## changeLogs

## 2020-05-18

#### sagas优化

> 目前是修改了Action的基础模型, {type, payload} => {type, payload, history}, dva-core不支持修改effect模型内置的功能, 想要修改到{put, call}中需要对dva-core重写

 增加`withHistory`插件对`effects`做统一注入`history`的处理, 方便在`effects`函数中调用`history`的功能



## 2020-05-18

#### 替换 react-scripts-rewired

> react-scripts-rewired 不支持 react-scripts 3+ 导致项目启动报错, 选择carco作为替代库


## 2020-05-20

#### 编译优化
    - react/react-dom使用umd模式引用, 不编译react/react-dom进bundle.js
    - webpack产出分析(webpack-bundle-analyzer)




# todos

- [ ] 优化项目产出体积
    - [X] react/react-dom使用umd模式引用
    - [X] 增加产出分析插件
    - [ ] core改为umd引用 
    - [ ] chunks分包
    - [ ] ...
    