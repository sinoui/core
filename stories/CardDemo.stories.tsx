import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import { opacify } from 'polished';
import { useRipple } from '@sinoui/ripple';
import {
  MdShare,
  MdMoreVert,
  MdPlayArrow,
  MdFastRewind,
  MdFastForward,
  MdStar,
  MdStarBorder,
  MdCheckCircle,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import Card from '@sinoui/core/Card';
import CardHeader from '@sinoui/core/CardHeader';
import CardMedia from '@sinoui/core/CardMedia';
import CardContent from '@sinoui/core/CardContent';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardActions from '@sinoui/core/CardActions';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import mediaImg1 from './images/mediaImg1.jpg';

export default {
  title: 'CardDemo',
};

const StyledCardInner = styled.div<{
  flexDirection?: 'row' | 'column';
  border?: boolean;
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  flex: 1;

  & h5 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.h5.fontSize};
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
    line-height: 1.334;
  }

  & h6 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.body1.fontSize};
    color: ${(props) => props.theme.palette.text.secondary};
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
    line-height: 1.75;
  }

  & .icons {
    display: flex;
    align-items: center;
    padding: 0 0 16px 16px;
    & svg {
      font-size: 24px;
    }
  }
`;

const mediaCardUrl =
  'https://material-ui.com/static/images/cards/live-from-space.jpg';

export const UIControls0 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card style={{ flexDirection: 'row' }}>
      <StyledCardInner flexDirection="column">
        <CardContent>
          <h5>Live From Space</h5>
          <h6>Mac Miller</h6>
        </CardContent>
        <div className="icons">
          <MdFastRewind />
          <MdPlayArrow />
          <MdFastForward />
        </div>
      </StyledCardInner>

      <CardMedia
        imageUrl={mediaCardUrl}
        width={151}
        style={{ borderRadius: '0 4px 4px 0' }}
      />
    </Card>
  </ThemeProvider>
);

const StyledCardContent = styled(CardContent)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;
export const UIControls1 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card>
      <StyledCardInner>
        <CardMedia
          imageUrl={mediaImg1}
          width={162}
          style={{ borderRadius: '4px 0 0 0' }}
        />
        <StyledCardContent>
          <h5>Rozes</h5>
          <h6>Mac Miller</h6>
        </StyledCardContent>
      </StyledCardInner>

      <CardActions>
        <CardActionButtons>Rate this album</CardActionButtons>
        <CardActionIcons>
          <MdStar />
          <MdStar />
          <MdStarBorder />
        </CardActionIcons>
      </CardActions>
    </Card>
  </ThemeProvider>
);

const StyledDivider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  margin: 16px -16px;
`;

const disabledCss = css`
  &::before {
    background-color: ${opacify(-0.62, '#fff')};
  }
`;

const enableCss = css`
  &:hover::before {
    background-color: ${opacify(-0.92, '#fff')};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }

  &:focus::before {
    background-color: ${opacify(-0.76, '#fff')};
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows[8]};
  }
`;
const StyledCard = styled(Card)<{ disabled?: boolean }>`
  padding: 16px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
  cursor: pointer;
  ${(props) => (props.disabled ? disabledCss : enableCss)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  & h1 {
    margin: 0;
  }

  & svg {
    font-size: 24px;
    position: absolute;
    right: 16px;
  }
`;
export const 卡片的各种交互状态 = () => {
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const ref = useRipple<HTMLDivElement>();

  // 选中卡片
  const setCardSelected = () => {
    setSelected(true);
  };

  // 取消卡片选中
  const cancelCardSelected = (e: React.MouseEvent) => {
    setSelected(false);
    e.stopPropagation();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <button onClick={() => setDisabled(!disabled)}>设置禁用</button>
      </div>
      <StyledCard onClick={setCardSelected} ref={ref} disabled={disabled}>
        {selected && <MdCheckCircle onClick={cancelCardSelected} />}
        <h1>Call</h1>
        <h1>Jennifer</h1>
        <StyledDivider />
        <div>October 07,2020</div>
      </StyledCard>
    </ThemeProvider>
  );
};

const StyledCardWrapper = styled(Card)`
  padding: 16px;
  margin-right: 16px;
  & h1 {
    margin: 16px 0 0;
  }

  & h1 ~ h4 {
    margin: 16px 0 0;
  }
  & h4 {
    margin: 0;
    color: ${(props) => props.theme.palette.text.secondary};
    font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  }
`;
export const 文字组合卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <StyledCardWrapper>
      <CardPrimaryAction>
        <h4>Marketing</h4>
        <h1>123.4M</h1>
      </CardPrimaryAction>
    </StyledCardWrapper>

    <StyledCardWrapper>
      <h4>Sales</h4>
      <h1>345.8M</h1>
      <h4>+11</h4>
    </StyledCardWrapper>

    <StyledCardWrapper>
      <h4>Users</h4>
      <h1>345.8M</h1>
    </StyledCardWrapper>
  </ThemeProvider>
);

export const 边框模式的简单卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <StyledCardWrapper outlined>
      <h4>Marketing</h4>
      <h1>123.4M</h1>
    </StyledCardWrapper>
  </ThemeProvider>
);

const Avatar = () => {
  return (
    <div
      style={{
        height: '40px',
        width: '40px',
        backgroundColor: '#f44336',
        borderRadius: '4px',
      }}
    />
  );
};

const mediaImgUrl =
  'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg';

export const 带有图片和操作按钮的卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card>
      <CardPrimaryAction>
        <CardMedia imageUrl={mediaImgUrl} wide />
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <button>read</button>
          <button>bookmark</button>
        </CardActionButtons>
        <CardActionIcons>
          <MdShare />
          <MdMoreVert />
        </CardActionIcons>
      </CardActions>
    </Card>
  </ThemeProvider>
);

export const 有cardHeader的卡片 = () => (
  <ThemeProvider theme={defaultTheme}>
    <Card>
      <CardPrimaryAction>
        <CardHeader
          avatar={<Avatar />}
          action={<MdMoreVert />}
          title="Shrimp and Chorizo Paella"
          subheader="subheader"
        />
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <button>read</button>
          <button>bookmark</button>
        </CardActionButtons>
        <CardActionIcons>
          <MdShare />
          <MdMoreVert />
        </CardActionIcons>
      </CardActions>
    </Card>
  </ThemeProvider>
);

export const 可展开的卡片 = () => {
  const [expand, setExpand] = useState(false);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card style={{ maxWidth: '345px' }}>
        <CardPrimaryAction>
          <CardHeader
            avatar={<Avatar />}
            action={<MdMoreVert />}
            title="Shrimp and Chorizo Paella"
            subheader="subheader"
          />
          <CardMedia imageUrl={mediaImgUrl} wide />
          <CardContent>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </CardContent>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <button>read</button>
            <button>bookmark</button>
          </CardActionButtons>
          <CardActionIcons>
            <span onClick={() => setExpand(!expand)}>
              {!expand && <MdKeyboardArrowDown />}
              {expand && <MdKeyboardArrowUp />}
            </span>
          </CardActionIcons>
        </CardActions>
        {expand && (
          <CardContent>
            展开显示的文字文字文字文字文字文字文字文字文字文字文字文字文字文字
          </CardContent>
        )}
      </Card>
    </ThemeProvider>
  );
};
