import React from 'react';
import styled from 'styled-components';
import getColorFromTheme from '@sinoui/core/utils/getColorFromTheme';
import colorCss from '@sinoui/core/utils/colorCss';
import StoryLayout from './StoryLayout';

export default {
  title: 'ThemeColor',
};

const Typography = styled.p`
  color: ${({ color = 'textPrimary', theme }) =>
    getColorFromTheme(theme, color)};
`;

export const getColorFromTheme方法 = () => (
  <StoryLayout>
    <Typography>color=primary</Typography>
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

const H1 = styled.p`
  ${colorCss('color', 'textPrimary')}
`;

const H2 = styled.p`
  ${colorCss(['fill', 'color'], 'textPrimary')}
`;

export const colorCss方法 = () => (
  <StoryLayout>
    <H1>color=primary</H1>
    <H1 color="primary">color=primary</H1>
    <H1 color="secondary">color=secondary</H1>
    <H1 color="textPrimary">color=textPrimary</H1>
    <H1 color="textSecondary">color=textSecondary</H1>
    <H1 color="error">color=error</H1>
    <H1 color="warning">color=warning</H1>
    <H1 color="success">color=success</H1>
    <H1 color="info">color=info</H1>
    <H2>H2</H2>
  </StoryLayout>
);
