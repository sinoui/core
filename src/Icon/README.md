# 图标

材料设计中的[图标](https://material.io/guidelines/style/icons.html)使用几何形状来直观地表达核心想法、功能或主题。

`Icon`组件可以用来显示[系统图标](https://material.io/guidelines/style/icons.html#icons-system-icons)。使用[字体](https://fonts.gstatic.com/s/materialicons/v33/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2)来显示图标。

使用方式：

```react
import Icon from 'sinoui-components/Icon';

<Icon>add_circle</Icon>
```

必须在 HTML 中添加[系统图标](https://material.io/guidelines/style/icons.html#icons-system-icons)的 css 样式链接。如下所示：

```html
<!DOCTYPE html>
<html>
  <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
</html>
```

或者下载系统图标字体到本地，引用本地字体，如下：

```css
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'),
    url(./fonts/material-icons.woff2) format('woff2'), url(./fonts/material-icons.woff)
      format('woff'), url(./fonts/material-icons.ttf) format('truetype');
}
```
