import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@sinoui/theme/defaultTheme';
import Scrollbar from '@sinoui/core/Scrollbar';

export default function BaseDemo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Scrollbar
        style={{
          height: 200,
          width: 200,
          border: '1px solid red',
          margin: '16px 0px',
        }}
      >
        1、真正的友情，无论是挑拨离间的阴风，还是天灾人祸的霹雳，无论是阴谋诡计的浓雾，还是贫困潦倒的严霜，都不能使你胆怯，都不能使你疏远，都不能使你背叛。你坚韧若高山的岩石，你连绵如长长的流水。
        2、承受是一种真诚，一种用心铸成的应允领悟；承受是一种涵养，一种处变不惊、处乱不慌的气度和坦荡；承受是一种力量，一种排泄流俗、弘扬正气的凸现和舒展。承受如一杯陈年老酒，醇香而清冽；承受像一盆羞涩的朝花，含苞待放；承受似一支乡音俚曲，粗朴而深厚；承受是一位哲学家的絮语，含蓄而隽永。
      </Scrollbar>
    </ThemeProvider>
  );
}
