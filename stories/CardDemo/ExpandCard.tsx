import React, { useState } from 'react';
import {
  MdMoreVert,
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
import Button from '@sinoui/core/Button';
import SvgIcon from '@sinoui/core/SvgIcon';
import IconButton from '@sinoui/core/IconButton';
import Avatar from './Components/Avatat';
import { mediaImgUrl } from './constant';

export default function Demo() {
  const [expand, setExpand] = useState(false);
  return (
    <Card style={{ maxWidth: '345px' }}>
      <CardHeader
        avatar={<Avatar />}
        action={
          <IconButton>
            <SvgIcon as={MdMoreVert} />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="subheader"
      />
      <CardPrimaryAction>
        <CardMedia imageUrl={mediaImgUrl} wide />
        <CardContent>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and
          set aside for 10 minutes.
        </CardContent>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <Button>read</Button>
          <Button>bookmark</Button>
        </CardActionButtons>
        <CardActionIcons>
          <span onClick={() => setExpand(!expand)}>
            {!expand && (
              <IconButton>
                <SvgIcon as={MdKeyboardArrowDown} />
              </IconButton>
            )}
            {expand && (
              <IconButton>
                <SvgIcon as={MdKeyboardArrowUp} />
              </IconButton>
            )}
          </span>
        </CardActionIcons>
      </CardActions>
      {expand && (
        <CardContent>
          展开显示的文字文字文字文字文字文字文字文字文字文字文字文字文字文字
        </CardContent>
      )}
    </Card>
  );
}
