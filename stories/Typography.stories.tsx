import React, { useEffect } from 'react';
import StoryLayout from './StoryLayout';
import Typography from '@sinoui/core/Typography';
import H1 from '@sinoui/core/H1';
import H2 from '@sinoui/core/H2';
import H3 from '@sinoui/core/H3';
import H4 from '@sinoui/core/H4';
import H5 from '@sinoui/core/H5';
import H6 from '@sinoui/core/H6';
import Subtitle1 from '@sinoui/core/Subtitle1';
import Subtitle2 from '@sinoui/core/Subtitle2';
import Body1 from '@sinoui/core/Body1';
import Body2 from '@sinoui/core/Body2';
import Caption from '@sinoui/core/Caption';
import Overline from '@sinoui/core/Overline';

export default {
  title: 'Typography',
};

function TypographyRef() {
  const ref = React.createRef();
  useEffect(() => {
    console.log(ref.current);
  });
  return <H1 ref={ref}>ref</H1>;
}

export const 基本组件使用 = () => (
  <StoryLayout>
    <H1>h1.一级标题</H1>
    <H2>h2. 二级标题</H2>
    <H3>h3. 三级标题</H3>
    <H4>h4. 四级标题</H4>
    <H5>h5. 五级标题</H5>
    <H6>h6. 六级标题</H6>
    <Subtitle1>subtitle1. 副标题1</Subtitle1>
    <Subtitle2>subtitle2. 副标题2</Subtitle2>
    <Body1>body1. 段落 1</Body1>
    <Body2>body2. 段落 2</Body2>
    <Caption>Caption. 说明</Caption>
    <Overline>Overline.</Overline>
    <Typography>Typography.</Typography>
  </StoryLayout>
);

export const 设置属性 = () => (
  <StoryLayout>
    1.as属性，变更DOM元素：
    <H1 as="h2">H1</H1>
    2.align属性，文本对齐方式：
    <H1 align="center">H1</H1>
    3.noWrap属性，是否换行：
    <H1 noWrap>
      React has been designed from the start for gradual adoption, and you can
      use as little or as much React as you need.
    </H1>
    4.color属性，控制颜色：
    <H1 color="success">H1</H1>
    5.gutterBottom属性，是否在底部添加间隙，H1~H6、Subtitle1、Subtitle2：
    <H1 gutterBottom>H1</H1>
    6.paragraph属性设置1rem底部外边距，一般用在Body1和Body2之上:
    <Body2 paragraph>Body2</Body2>
    7.Typography组件的type属性：
    <Typography type="body1">Typography</Typography>
    <Typography as="div">Typography</Typography>
    <Typography>Typography</Typography>
    8.ref属性：
    <TypographyRef />
  </StoryLayout>
);

export const 设置颜色 = () => (
  <StoryLayout>
    <Typography>默认文本颜色：palette.text.primary</Typography>
    <Typography color="primary">color=primary</Typography>
    <Typography color="secondary">color=secondary</Typography>
    <Typography color="textPrimary">color=textPrimary</Typography>
    <Typography color="textSecondary">color=textSecondary</Typography>
    <Typography color="error">color=error</Typography>
    <Typography color="warning">color=warning</Typography>
    <Typography color="success">color=success</Typography>
    <Typography color="info">color=info</Typography>
  </StoryLayout>
);

export const 文章 = () => (
  <StoryLayout>
    <H1 gutterBottom>Try React</H1>
    <Body1 paragraph>
      React has been designed from the start for gradual adoption, and you can
      use as little or as much React as you need. Whether you want to get a
      taste of React, add some interactivity to a simple HTML page, or start a
      complex React-powered app, the links in this section will help you get
      started.
    </Body1>
    <H2 gutterBottom>Online Playgrounds</H2>
    <Body1 paragraph>
      If you prefer to use your own text editor, you can also download this HTML
      file, edit it, and open it from the local filesystem in your browser. It
      does a slow runtime code transformation, so we’d only recommend using this
      for simple demos.
    </Body1>
    <Subtitle1 gutterBottom>Create a New React App</Subtitle1>
    <Body2 paragraph>
      As your application grows, you might want to consider a more integrated
      setup. There are several JavaScript toolchains we recommend for larger
      applications. Each of them can work with little to no configuration and
      lets you take full advantage of the rich React ecosystem. Learn how.
    </Body2>
  </StoryLayout>
);
