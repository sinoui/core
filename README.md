# @sinoui/core

这是由[ts-lib-scripts](https://github.com/sinoui/ts-lib-scripts)创建的 TypeScript 库项目。

## 本地开发

项目中有以下有用的命令。

## `yarn storybook`

启动组件示例项目。

## 启动文档服务

首先安装 docs 相关的依赖：

```shell
cd docs
yarn install
```

然后启动文档服务：

```shell
yarn start
```

### `yarn build`

打包，并将打包文件放在`dist`文件夹中。使用 rollup 对代码做优化并打包成多种格式（`Common JS`，`UMD`和`ES Module`）。

### `yarn lint`

`yarn lint`会检查整个项目是否有代码错误、风格错误。

开启 vscode 的 eslint、prettier 插件，在使用 vscode 编码时，就会自动修正风格错误、提示语法错误。

### `yarn format`

`yarn format`可以自动调整整个项目的代码风格问题。

### `yarn test`

`yarn test`以监听模式启动 jest，运行单元测试。

开启 vscode 的 jest 插件，会在文件变化时自动运行单元测试。

## 组件清单

| 编号 | 组件名     | 描述         | 状态   |
| ---- | ---------- | ------------ | ------ |
| 0    | BaseButton | 基础按钮组件 | v1.0.0 |
| 1    | Button     | 按钮组件     | v1.0.0 |
| 2    | TextInput  | 文本输入框   | v0.1.0 |

## 规范

需要导出的组件，均需要在 `src` 下创建组件目录，并且在 `index.ts` 中导出。如：

```
core
|__ src
    |__ BaseButton
      |__ BaseButton.tsx
      |__ BaseButton.test.tsx
      |__ index.ts
    |__ Button
      |__ Button.tsx
      |__ Button.test.tsx
      |__ index.ts
    |__ LoadingButton
      |__ LoadingButton.tsx
      |__ LoadingButton.test.tsx
      |__ index.ts
    |__ index.ts
|__ stories
    |__ 0-BaseButton.stories.tsx
    |__ 1-Button.stories.tsx
    |__ 2-LoadingButton.stories.tsx
```

导入：

```tsx
import BaseButton from '@sinoui/core/BaseButton';
import Button from '@sinoui/core/Button';
import LoadingButton from '@sinoui/core/LoadingButton';
```

或者：

```tsx
import { BaseButton, Button, LoadingButton } from '@sinoui/core';
```

在 `stories` 中采用 `import BaseButton from '@sinoui/core/BaseButton'`，而不能用 `import { BaseButton } from '../src'`：

- ✅ `import BaseButton from '@sinoui/core/BaseButton'`
- 🔴 `import BaseButton from '../src/BaseButton'`
- 🔴 `import { BaseButton } from '@sinoui/core'`
- 🔴 `import { BaseButton } from '../src'`

### 关于第三方依赖

1. 不能将 `react`、`react-dom` 放入到 dependencies 中
2. 不能将 `@types/*` 放入到 dependencies 中
3. 不能将工具相关的依赖放入到 dependencies 中

### 关于 ref

尽量将 DOM 元素通过 ref 的方式暴露出去。

### 关于单元测试

坚持测试驱动开发。在代码评审环节，加上测试代码质量的评审。

### 关于 eslint 错误与警告提示

不能有任何 eslint 错误提示。尽量消除 eslint 警告提示。

### 关于组件文档

组件文档分成示例和 API 文档两部分。示例用来介绍组件用途、用法、样式定制等，API 文档中介绍组件属性。

注意：在线修改代码还需要调整后才可使用。
