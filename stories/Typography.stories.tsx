import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('Typography', module)
  .add('基本文字排版', () => (
    <StoryLayout>
      <H1>H1</H1>
      <H2>H1</H2>
      <H3>H1</H3>
      <H4>H1</H4>
      <H5>H1</H5>
      <H6>H1</H6>
      <Subtitle1>H1</Subtitle1>
      <Subtitle2>H1</Subtitle2>
      <Body1>H1</Body1>
      <Body2>H1</Body2>
      <Caption>H1</Caption>
      <Overline>H1</Overline>
      <Typography>H1</Typography>
    </StoryLayout>
  ))
  .add('设置属性', () => (
    <StoryLayout>
      <H1 as="h2">H1</H1>
      <H1 align="center">H1</H1>
      <H1 noWrap>H1</H1>
      <H1 color="success">H1</H1>
      <H1 gutterBottom>H1</H1>
      <H1>H1</H1>
      <Body2>Body2</Body2>
      <Body2 paragraph>Body2</Body2>
      <Typography type="body1">Typography</Typography>
      <Typography type="body1" as="p">
        Typography
      </Typography>
    </StoryLayout>
  ))
  .add('颜色设置', () => (
    <StoryLayout>
      <Typography>Typography</Typography>
      <Typography color="primary">Typography</Typography>
      <Typography color="secondary">Typography</Typography>
      <Typography color="textPrimary">Typography</Typography>
      <Typography color="textSecondary">Typography</Typography>
      <Typography color="error">Typography</Typography>
      <Typography color="warning">Typography</Typography>
      <Typography color="success">Typography</Typography>
      <Typography color="info">Typography</Typography>
    </StoryLayout>
  ))
  .add('文章', () => (
    <StoryLayout>
      <Typography>
        React has been designed from the start for gradual adoption, and you can
        use as little or as much React as you need. Whether you want to get a
        taste of React, add some interactivity to a simple HTML page, or start a
        complex React-powered app, the links in this section will help you get
        started.React has been designed from the start for gradual adoption, and
        you can use as little or as much React as you need. Perhaps you only
        want to add some “sprinkles of interactivity” to an existing page. React
        components are a great way to do that.
      </Typography>
    </StoryLayout>
  ));
