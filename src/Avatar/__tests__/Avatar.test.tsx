import React from 'react';
import renderer from 'react-test-renderer';
import { MdAdd } from 'react-icons/md';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Avatar from '@sinoui/core/Avatar';
import SvgIcon from '@sinoui/core/SvgIcon';
import avatarf from './avatarf.jpg';
import avatars from './avatars.jpg';
import avatart from './avatart.jpg';

/**
 * Avatar头像组件
 */

describe('Avatar组件 快照测试', () => {
  it('图片头像', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Avatar>
            <img src={avatarf} alt="" />
          </Avatar>
          <Avatar>
            <img src={avatars} alt="" />
          </Avatar>
          <Avatar>
            <img src={avatart} alt="" />
          </Avatar>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('字母头像', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Avatar>H</Avatar>
          <Avatar>N</Avatar>
          <Avatar>LX</Avatar>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('图标头像', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Avatar>
            <SvgIcon>
              <MdAdd />
            </SvgIcon>
          </Avatar>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('是否为密集模式', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Avatar dense>
            <img src={avatarf} alt="" />
          </Avatar>
          <p />
          <Avatar dense>
            <SvgIcon as={MdAdd} />
          </Avatar>
          <p />
          <Avatar dense>H</Avatar>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置不同背景颜色', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <Avatar color="primary">LX</Avatar>
          <Avatar color="secondary">LX</Avatar>
          <Avatar color="warning">LX</Avatar>
          <Avatar color="error">LX</Avatar>
          <Avatar color="success">LX</Avatar>
          <Avatar color="info">LX</Avatar>
          <Avatar color="actionActive">LX</Avatar>
          <Avatar color="actionDisabled">LX</Avatar>
        </ThemeProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
