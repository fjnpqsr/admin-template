# SchedulingTable

### 用法

```jsx harmony

<SchedulingTable
    classLength={20}
    data={data}
/>

```


| props | desc | type|
|--- |--- |--- |
| classLength | 最大的班级数量, 内部自动生成表头班级 | Number |
| data | 行数据, 格式为['小学一年级', '未', '已', '', '未'], 未达到最大班级数量的, 会自动填充`''`至达到班级数量| Array|

> 注意事项:  

- 期望接口返回值格式, 字段名称随意
```json
{
    "classLength": 20,
    "list": [
        {
            "name": "小学一年级",
            "data": ["未", "已", "", "未"]
        },  
        {
            "name": "小学二年级",
            "data": ["未", "已", "", "未"]
        }
    ]
}
```
接口格式中如果data的某项为"", 请返回空字符串, 未达到classLength的data会自动填充`""`至classLength数

- 在数据进入组件之前需要对数据进行重新构造, 传data的时候使用 `list.map(item => ([item.name].concat(item.data)))` 拼接name和data到同一个数组中
