# 版本变更说明

## v1.1.6 - 2022.3.17

- fix(Scrollbar): 修复子元素发生变化，没有自动计算滚动条布局的缺陷

## v1.1.5 - 2022.3.17

- improve(Scrollbar): 降低@react/use-gesture 版本号，使滚动条组件兼容 IE 浏览器

## v1.1.4 - 2022.3.16

- feat(Scrollbar): 添加滚动条组件

## v1.1.3 - 2022.3.4

- fix(AutoComplete): 修复多选 AutoComplete 失去焦点时值为空的情况下会报错的缺陷

## v1.1.2 - 2022.2.19

- fix(RadioGroup): 修复 RadioGroup 不能正确处理 onBlur 和 onFocus 属性的缺陷

## v1.1.1 - 2021.12.10

- fix(ToggleButton): 修复无法自定义切换按钮样式的缺陷

## v1.1.0 - 2021.12.10

- feat(ToggleButton): 新增切换按钮组件

## v1.0.22 - 2021.12.08

- fix(Menu): 修复点击 menu 之外元素关闭弹窗的监听引起 Menu 弹出错误的问题

## v1.0.21 - 2021.12.07

- improve(Menu): 去掉不用的旧版 Menu 代码

## v1.0.19 - 2021.12.06

- fix(Button): 修复 Button 组件 as 属性导致丢失 sinoui-base-button 样式的缺陷

## v1.0.18 - 2021.12.06

- fix: 修复部分版本的 IE 浏览器下由于 Modal 弹框导致的浏览器崩溃问题

## v1.0.17 - 2021.12.03

- fix: 修复 IE 浏览器锁定滚动条失败的缺陷

## v1.0.16 - 2021.11.08

- fix: 修复安装 @sinoui/core 失败的缺陷

## v1.0.15 - 2021.11.08

- fix: 修复 Button 等组件拖慢 ts 提示 50 倍速度的缺陷
- fix(DatePicker): 修复年度选择弹窗出现横向滚动条的缺陷
- fix(AppBarTitle): 修复 AppBarTitle 无 `sino-app-bar--title` class 的缺陷
- fix(NavigationRailAction): 修复 `NavigationRailAction` 组件多出 `value` DOM 属性的缺陷

## v1.0.14 - 2021.11.05

- fix(Select): 修复已经有值的单选下拉框切换为多选下拉框时，页面报错的 bug

## v1.0.13 - 2021.11.05

- fix(Select): 修复已经有值的单选下拉框切换为多选下拉框时，页面报错的 bug

## v1.0.12 - 2021.9.13

- fix(FormControl): 修复没有指定 label 标签或者指定为 undefined、null 时却渲染出 label 元素的缺陷
- fix(Select): 修复下拉选择框的鼠标样式错误

## v1.0.10 - 2021.8.30

- fix: 修复 getContainerElement 无法在 node.js 中运行，导致执行 SSR 任务失败的缺陷

## v1.0.9 - 2021.8.30

- fix: 修复 ModalManager 在初始化时使用了 document，导致无法在 node.js 环境下执行类似 SSR 任务的缺陷

## v1.0.8 - 2021.8.30

- fix: 将 useLayoutEffect 替换为 useEnhancedEffect，解决无法在 node.js 环境下执行类似 SSR 任务的缺陷

## v1.0.7 - 2021.8.30

- fix(OutlinedInput): 修复在 Node.js 环境下无法执行类似 SSR 任务的缺陷

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
