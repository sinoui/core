import React from 'react';
import styled from 'styled-components';
import Tooltip from '@sinoui/core/Tooltip';
import IconButton from '@sinoui/core/IconButton';
import Add from '@sinoui/icons/Add';
import Button from '@sinoui/core/Button';
import { Row, Column } from '@sinoui/core/Grid';
import Fade from '@sinoui/core/Fade';
import StoryLayout from './StoryLayout';

export default {
  title: 'Tooltip',
};

const Demo = ({ arrow }: { arrow?: boolean }) => {
  return (
    <StoryLayout>
      <Row>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" placement="right" arrow={arrow}>
            <IconButton>
              <Add />
            </IconButton>
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" placement="top" arrow={arrow}>
            <Button raised>下弹出</Button>
          </Tooltip>
        </Column>
      </Row>
    </StoryLayout>
  );
};

export const baseDemo = () => <Demo />;

const StyledButton = styled(Button)`
  height: 50px;
`;

export const 带箭头 = () => {
  return (
    <StoryLayout>
      <Row>
        <Column
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip
            title="提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示"
            placement="top-start"
          >
            <StyledButton>TOP-START</StyledButton>
          </Tooltip>
          <Tooltip title="提示提示提示提示" placement="top">
            <StyledButton>TOP</StyledButton>
          </Tooltip>
          <Tooltip title="提示提示提示提示提示" placement="top-end">
            <StyledButton>TOP-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left-start">
            <StyledButton>LEFT-START</StyledButton>
          </Tooltip>
        </Column>
        <Column
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="提示" placement="right-start">
            <StyledButton>RIGHT-START</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left">
            <StyledButton>LEFT</StyledButton>
          </Tooltip>
        </Column>
        <Column
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="提示" placement="right">
            <StyledButton>RIGHT </StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Tooltip title="提示" placement="left-end">
            <StyledButton>LEFT-END</StyledButton>
          </Tooltip>
        </Column>
        <Column
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="提示" placement="right-end">
            <StyledButton>RIGHT-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
      <Row>
        <Column
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip title="提示" placement="bottom-start">
            <StyledButton>BOTTOM-START</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="bottom">
            <StyledButton>BOTTOM</StyledButton>
          </Tooltip>
          <Tooltip title="提示" placement="bottom-end">
            <StyledButton>BOTTOM-END</StyledButton>
          </Tooltip>
        </Column>
      </Row>
    </StoryLayout>
  );
};

const Demo1 = () => {
  return (
    <StoryLayout>
      <Row>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" trigger="hover">
            <Button raised>hover</Button>
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" trigger="focus">
            <input />
          </Tooltip>
        </Column>
        <Column xs={6}>
          <Tooltip title="这是一段提示文字" trigger="click">
            <Button raised>click</Button>
          </Tooltip>
        </Column>
      </Row>
    </StoryLayout>
  );
};

export const 触发事件 = () => <Demo1 />;

export const 移动端触发 = () => (
  <StoryLayout>
    <Tooltip title="这是一段提示文字" trigger="click" isMobile>
      <Button raised>click</Button>
    </Tooltip>
  </StoryLayout>
);

export const 动画 = () => (
  <StoryLayout>
    <Tooltip title="fade" trigger="click" transitionComponent={Fade}>
      <Button raised>fade</Button>
    </Tooltip>

    <Tooltip title="Grow" trigger="click">
      <Button raised>默认Grow</Button>
    </Tooltip>
  </StoryLayout>
);
