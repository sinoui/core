# 版本变更说明

## v1.0.6 - 2021.8.30

- fix(FormLabel): 调整 Lable 行高以修复 Label 中包含`y | g`时显示不全的问题

## v1.0.5 - 2021.8.30

因早期发布失误，导致 1.0.4 版本号已经被占用，所以紧急发布 1.0.5 版本。

## 1.0.4 - 2021.8.30

- fix(FormLabel): 修复在 FormControl 中的 TextInput 有 placeholder 属性，而标签没有上浮的缺陷
- improve(FormLabel): [改进 FormLabel 的 className](#改进-formlabel-的-classname)，优化样式定制的开发体验

### 改进 FormLabel 的 className

改进后的 `FormLabel` 的 `className` 有：

- `sinoui-form-label` （从一开始就有）
- `sinoui-form-label--variant-outlined` - 与轮廓输入框组合使用时
- `sinoui-form-label--variant-filled` - 与填充输入框组合使用时
- `sinoui-form-label--variant-standard` - 与标准输入框组合使用时
- `sinoui-form-label--layout-floating` - 标签采用浮动布局
- `sinoui-form-label--layout-shrink` - 标签采用收缩布局（固定在上方）
- `sinoui-form-label--layout-standard` - 标签采用标准布局（不缩放，不浮动）
- `sinoui-form-label--focused` - 在表单控件获取到焦点时
- `sinoui-form-label--filled` - 在表单控件有填充值时（有输入值或者 placeholder）
- `sinoui-form-label--required-is-after` - 必填符号在标签的右侧显示（水平布局时）

## 1.0.3 - 2021.8.19

- fix: 修复`Backdrop`无法显示 children 的缺陷

## v1.0.2 - 2021.8.19

- fix: 修复在 webpack 模块联邦中无法共享 FormControl 子模块的缺陷

## v1.0.0 - 2021.8.17

- fix(TextInput): 修复轮廓输入框中的标签文本在某些情况下会被轮廓贯穿的缺陷
- fix(FormLabel): 修复轮廓输入框中的标签文本没有垂直对齐的缺陷

## v1.0.0-beta.74 - 2021.5.7

- fix(TextInput): 修复边框模式的输入框样式偶尔错乱的问题

## v1.0.0 -beat.73 - 2021.4.19

- fix:覆盖发布错的包

## v1.0.0-beat.72 - 2021.3.25

- fix(DateTimePicker): 修复日期时间选择组件 pc 端选择小时和分钟，当时间的值只有个位数时值不正确的 bug

## v1.0.0-beta.71

- fix(Dialog): 修复打开对话框后，会阻止页面的拖拽事件的缺陷
