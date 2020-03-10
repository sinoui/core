import React from 'react';
import Card from '@sinoui/core/Card';
import CardMedia from '@sinoui/core/CardMedia';
import CardContent from '@sinoui/core/CardContent';
import SvgIcon from '@sinoui/core/SvgIcon';
import IconButton from '@sinoui/core/IconButton';
import { MdPlayArrow, MdFastRewind, MdFastForward } from 'react-icons/md';
import StyledCardInner from './Components/StyledCardInner';
import { mediaAvatar } from './constant';

export default function Demo() {
  return (
    <Card style={{ flexDirection: 'row' }}>
      <StyledCardInner flexDirection="column">
        <CardContent>
          <h5>Live From Space</h5>
          <h6>Mac Miller</h6>
        </CardContent>
        <div className="icons">
          <IconButton>
            <SvgIcon as={MdFastRewind} />
          </IconButton>
          <IconButton>
            <SvgIcon as={MdPlayArrow} />
          </IconButton>
          <IconButton>
            <SvgIcon as={MdFastForward} />
          </IconButton>
        </div>
      </StyledCardInner>

      <CardMedia
        imageUrl={mediaAvatar}
        width={151}
        style={{ borderRadius: '0 4px 4px 0' }}
      />
    </Card>
  );
}
