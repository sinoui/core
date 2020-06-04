import React, { useState } from 'react';
import Fade from '@sinoui/core/Fade';
import Card from '@sinoui/core/Card';
import CardContent from '@sinoui/core/CardContent';
import CardActions from '@sinoui/core/CardActions';
import CardActionIcons from '@sinoui/core/CardActionIcons';
import ExpandMore from '@sinoui/icons/ExpandMore';
import CardHeader from '@sinoui/core/CardHeader';
import Avatar from '@sinoui/core/Avatar';
import MoreVert from '@sinoui/icons/MoreVert';
import CardPrimaryAction from '@sinoui/core/CardPrimaryAction';
import CardMedia from '@sinoui/core/CardMedia';
import CardActionButtons from '@sinoui/core/CardActionButtons';
import Share from '@sinoui/icons/Share';
import styled, { useTheme } from 'styled-components';
import Grow from '@sinoui/core/Grow';
import Slide from '@sinoui/core/Slide';
import FormControl from '@sinoui/core/FormControl';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import Switch from '@sinoui/core/Switch';
import { Row, Column } from '@sinoui/core/Grid';
import FormControlLabel from '@sinoui/core/FormControlLabel';
import Collapse from '@sinoui/core/Collapse';
import Body2 from '@sinoui/core/Body2';
import Zoom from '@sinoui/core/Zoom';
import CollapseNew from '@sinoui/core/CollapseNew';
import StoryLayout from './StoryLayout';
import { Button, IconButton } from '../src';

export default {
  title: '动效',
};

const mediaImgUrl =
  'https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg';

const BlockCard = styled(Card)`
  margin: 8px;
  width: 302px;
`;

const CardDemo = React.forwardRef((props: any, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <BlockCard {...props} ref={ref}>
      <CardHeader
        avatar={<Avatar />}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="subheader"
      />
      <CardPrimaryAction>
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>content</CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <Button>read</Button>
          <Button>bookmark</Button>
        </CardActionButtons>
        <CardActionIcons>
          <IconButton>
            <Share />
          </IconButton>
          <IconButton
            style={{
              transition: theme.transitions.create('transform'),
              transform: `rotate(${isOpen ? 180 : 0}deg)`,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ExpandMore />
          </IconButton>
        </CardActionIcons>
      </CardActions>
      <Collapse in={isOpen} unmountOnExit timeout="auto">
        <CardContent>
          <Body2 paragraph>Method:</Body2>
          <Body2 paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Body2>
          <Body2 paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Body2>
          <Body2 paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Body2>
          <Body2 paragraph>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Body2>
        </CardContent>
      </Collapse>
    </BlockCard>
  );
});

function FadeDemo() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <div>
        <Fade in={isIn}>
          <CardDemo />
        </Fade>
      </div>
      <div>
        {isIn && (
          <Fade in={isIn}>
            <CardDemo />
          </Fade>
        )}
      </div>
    </StoryLayout>
  );
}

export const fade = () => <FadeDemo />;

function GrowDemo() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <div>
        <Grow in={isIn}>
          <CardDemo />
        </Grow>
      </div>
      <div>
        {isIn && (
          <Grow in={isIn}>
            <CardDemo />
          </Grow>
        )}
      </div>
    </StoryLayout>
  );
}

export const grow = () => <GrowDemo />;

const SlideDemo = () => {
  const [isIn, setIsIn] = useState(true);
  const [direction, setDirection] = useState<any>('up');
  const [mountOnEnter, setMountOnEnter] = useState(false);

  return (
    <StoryLayout>
      <div
        style={{
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
        }}
      >
        <Slide
          in={isIn}
          direction={direction}
          mountOnEnter={mountOnEnter}
          unmountOnExit={mountOnEnter}
        >
          <CardDemo />
        </Slide>
      </div>

      <Row style={{ zIndex: 1 }}>
        <Column xs={6}>
          <FormControl label="状态">
            <FormControlLabel
              label="显示"
              control={
                <Switch
                  checked={isIn}
                  onChange={(event) => setIsIn(event.target.checked)}
                />
              }
            />
          </FormControl>
        </Column>
        <Column xs={6}>
          <FormControl label="mountOnEnter">
            <Switch
              checked={mountOnEnter}
              onChange={(event) => setMountOnEnter(event.target.checked)}
            />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="方向">
            <RadioGroup value={direction} onChange={setDirection}>
              <Radio value="up">up</Radio>
              <Radio value="down">down</Radio>
              <Radio value="left">left</Radio>
              <Radio value="right">right</Radio>
            </RadioGroup>
          </FormControl>
        </Column>
      </Row>
    </StoryLayout>
  );
};

export const slide = () => <SlideDemo />;

function CollapseDemo() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <Row>
        <Column xs={8}>
          <Collapse in={isIn}>
            <CardDemo />
          </Collapse>
        </Column>
        <Column xs={8}>
          <Collapse in={isIn} collapsedHeight={100}>
            <CardDemo />
          </Collapse>
        </Column>
        <Column xs={8}>
          {isIn && (
            <Collapse in={isIn}>
              <CardDemo />
            </Collapse>
          )}
        </Column>
      </Row>
    </StoryLayout>
  );
}

export const collapse = () => <CollapseDemo />;

function ZoomDemo() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <div>
        <Zoom in={isIn}>
          <CardDemo />
        </Zoom>
      </div>
      <div>
        {isIn && (
          <Zoom in={isIn}>
            <CardDemo />
          </Zoom>
        )}
      </div>
    </StoryLayout>
  );
}

export const zoom = () => <ZoomDemo />;

function CollapseNewDemo() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <Row>
        <Column xs={8}>
          <CollapseNew in={isIn}>
            <CardDemo />
          </CollapseNew>
        </Column>
        <Column xs={8}>
          <CollapseNew in={isIn} collapsedHeight={100}>
            <CardDemo />
          </CollapseNew>
        </Column>
        <Column xs={8}>
          {isIn && (
            <CollapseNew in={isIn}>
              <CardDemo />
            </CollapseNew>
          )}
        </Column>
      </Row>
    </StoryLayout>
  );
}

export const collapseNew = () => <CollapseNewDemo />;

function CollapseHorizontal() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <Row>
        <Column xs={12}>
          <CollapseNew in={isIn} direction="horizontal">
            <CardDemo />
          </CollapseNew>
        </Column>
      </Row>
    </StoryLayout>
  );
}

export const collapseHorizontal = () => <CollapseHorizontal />;

function CollapseAuto() {
  const [isIn, setIsIn] = useState(false);
  return (
    <StoryLayout>
      <Button onClick={() => setIsIn(!isIn)} outlined>
        {isIn ? '关闭' : '打开'}
      </Button>
      <Row>
        <Column xs={12}>
          <CollapseNew in={isIn} direction="auto">
            <CardDemo />
          </CollapseNew>
        </Column>
      </Row>
    </StoryLayout>
  );
}

export const collapseAuto = () => <CollapseAuto />;
