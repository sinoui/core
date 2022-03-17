import React, { useEffect, useMemo, useRef, useState } from 'react';
import Scrollbar from '@sinoui/core/Scrollbar';
import styled, { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { hydrate } from 'react-dom';
import { range } from 'lodash';
import StoryLayout from './StoryLayout';
import { Button } from '../src';

export default {
  title: '滚动条',
};

const ActionLayout = styled.div`
  display: flex;
  margin: 16px;

  .sinoui-button {
    margin-right: 8px;
  }
`;

const defaultContent = `1、真正的友情，无论是挑拨离间的阴风，还是天灾人祸的霹雳，无论是阴谋诡计的浓雾，还是贫困潦倒的严霜，都不能使你胆怯，都不能使你疏远，都不能使你背叛。你坚韧若高山的岩石，你连绵如长长的流水。
2、承受是一种真诚，一种用心铸成的应允领悟；承受是一种涵养，一种处变不惊、处乱不慌的气度和坦荡；承受是一种力量，一种排泄流俗、弘扬正气的凸现和舒展。承受如一杯陈年老酒，醇香而清冽；承受像一盆羞涩的朝花，含苞待放；承受似一支乡音俚曲，粗朴而深厚；承受是一位哲学家的絮语，含蓄而隽永。
3、做不了大江大河，就做一条小小的溪流吧，做不了参天大树，就做一株小小的野草吧；做不了顶天立地的英雄，就做一个平凡的百姓吧。只要不停地奔流、生长、努力，也一样走过山高水远，也一样绿遍天涯，也一样活得光明磊落。
4、悲悯，是人的情感的一脉活水，有时漾开柔波，有时惊起阵痛；悲悯，是人心灵上的一场甘霖，可以滋润干涸的心田，可以净化污浊的世风。
5、用友谊写一本书，一本厚厚的书。在书里，友谊如珍珠，我们共同穿缀，联成一串串璀璨的项链；友谊如彩绸，我们共同剪裁，缝制成一件件绚丽的衣衫；友谊如油彩，我们共同调色，描绘出一幅幅美妙的图画。
6、爱心，是一片严冬里的阳光，使贫困交迫的人感到人间的温暖；爱心，是一股流在沙漠里的泉水，使口渴难忍的人感到生命的再生。
7、生命原是要不断地受伤，不断地复原，不断地创造，不断地被创造的。世界上没有永恒的东西，烦恼和痛苦也是如此，因为生活不会停顿。
8、春雨啊，哗哗地下，雨珠落在湖面上，像珍珠落在玉盘里四面溅射；雨珠落在干土上，地皮上陷下一个小坑，(www.lz13.cn)像草原姑娘脸上的笑靥。雨好牧草就好，牧草好牲口就好，牲口好牧民的生活就好。
9、无论是经两代人写《书》班氏父子，还是付出一生辛劳完成《间喜剧》巴尔扎克；无论是徒步穿行南极的秦大河，还是靠轮椅周游世界的贝克。汉森，他们的经历告诉我们，只有不断拼搏才能成功。无论是抗元卫国，历经千辛誓死南归的文天祥，还是忠义不屈，殉难江东的史可法；无论是视死如归，抛头颅于变法维新的谭嗣同，还是献身革命，洒热血于黄花冈的林觉民，他们的人生告诉我们，忠心为国，不畏牺牲，乃英雄所为。
10、在荆棘铺路的时候，你要用理想的利刃披荆斩棘；在漆黑围绕的时候，你要用信念的明灯照亮前程；在风雨狂作的时候，你要用坚强的大伞撑起晴空。人，在困境面前决不能丧失意志。`;

export const 基础使用 = () => (
  <StoryLayout>
    <div style={{ width: 200, height: 200, border: '1px solid red' }}>
      <Scrollbar>
        <div style={{ width: 300, height: 300 }}>
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
        </div>
      </Scrollbar>
    </div>
  </StoryLayout>
);

export const 容器尺寸改变 = () => (
  <StoryLayout>
    <div style={{ width: '100%', height: '90vh', border: '1px solid red' }}>
      <Scrollbar>
        <div style={{ width: 1000, height: 300 }}>
          这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字这是一篇文字
        </div>
      </Scrollbar>
    </div>
  </StoryLayout>
);

export const 改变内容高度 = () => {
  const [content, setContent] = useState(defaultContent);

  const handleClick = () => {
    setContent(
      `${content}10、在荆棘铺路的时候，你要用理想的利刃披荆斩棘；在漆黑围绕的时候，你要用信念的明灯照亮前程；在风雨狂作的时候，你要用坚强的大伞撑起晴空。人，在困境面前决不能丧失意志。`,
    );
  };

  return (
    <StoryLayout>
      <Scrollbar style={{ height: 400, width: 600, border: '1px solid red' }}>
        <div>{content}</div>
      </Scrollbar>
      <Button onClick={handleClick}>添加内容</Button>
    </StoryLayout>
  );
};

export const 改变容器尺寸 = () => {
  const [height, setHeight] = useState(200);
  return (
    <StoryLayout>
      <ActionLayout>
        <Button outlined onClick={() => setHeight(height - 50)}>
          高度➖
        </Button>
        <Button raised onClick={() => setHeight(height + 50)}>
          高度➕
        </Button>
      </ActionLayout>
      <Scrollbar style={{ width: 400, height, border: '1px solid red' }}>
        1、真正的友情，无论是挑拨离间的阴风，还是天灾人祸的霹雳，无论是阴谋诡计的浓雾，还是贫困潦倒的严霜，都不能使你胆怯，都不能使你疏远，都不能使你背叛。你坚韧若高山的岩石，你连绵如长长的流水。
        2、承受是一种真诚，一种用心铸成的应允领悟；承受是一种涵养，一种处变不惊、处乱不慌的气度和坦荡；承受是一种力量，一种排泄流俗、弘扬正气的凸现和舒展。承受如一杯陈年老酒，醇香而清冽；承受像一盆羞涩的朝花，含苞待放；承受似一支乡音俚曲，粗朴而深厚；承受是一位哲学家的絮语，含蓄而隽永。
        3、做不了大江大河，就做一条小小的溪流吧，做不了参天大树，就做一株小小的野草吧；做不了顶天立地的英雄，就做一个平凡的百姓吧。只要不停地奔流、生长、努力，也一样走过山高水远，也一样绿遍天涯，也一样活得光明磊落。
        4、悲悯，是人的情感的一脉活水，有时漾开柔波，有时惊起阵痛；悲悯，是人心灵上的一场甘霖，可以滋润干涸的心田，可以净化污浊的世风。
      </Scrollbar>
    </StoryLayout>
  );
};

export const 滚动内容高度为0 = () => (
  <StoryLayout>
    <Scrollbar style={{ height: 100, border: '1px solid red' }}>
      <div />
    </Scrollbar>
  </StoryLayout>
);

export const 滚动容器高度为0 = () => (
  <StoryLayout>
    <Scrollbar style={{ height: 0, border: '1px solid red' }}>
      <div style={{ height: 100 }} />
    </Scrollbar>
  </StoryLayout>
);

export const 高度自适应 = () => (
  <StoryLayout>
    <Scrollbar style={{ border: '1px solid red' }} autoHeight>
      <div style={{ height: 10000 }} />
    </Scrollbar>
  </StoryLayout>
);

function ServerSideRenderDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const element = useMemo(
    () => (
      <Scrollbar
        style={{
          height: 200,
          border: '1px solid red',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ height: 500 }} />
      </Scrollbar>
    ),
    [],
  );

  useEffect(() => {
    // 服务器端渲染
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const sheet = new ServerStyleSheet();
    container.innerHTML = renderToString(sheet.collectStyles(element));
    const styleTags = sheet.getStyleTags();
    document.head.innerHTML += styleTags;
    hydrate(element, container);
  }, [element]);

  return (
    <div>
      <h4>服务器端渲染</h4>
      <div>{renderToString(element)}</div>
      <h4>注水</h4>
      <div ref={containerRef} />
    </div>
  );
}

export const 服务器端渲染 = () => <ServerSideRenderDemo />;

const ComplexDemo = () => {
  const list = range(0, 1000).map((i) => (
    <li key={i}>
      <div>这是一段文字{i}</div>
      <div>这是一段文字{i}</div>
      <div>这是一段文字{i}</div>
    </li>
  ));
  return (
    <Scrollbar
      style={{
        height: 200,
        border: '1px solid red',
        boxSizing: 'border-box',
      }}
    >
      <ul>{list}</ul>
    </Scrollbar>
  );
};

export const 包含很多内容的滚动性能 = () => <ComplexDemo />;

const CustomScrollBar = styled(Scrollbar)`
  .sinoui-scrollbar__vertical-track {
    top: 8px;
    bottom: 8px;
  }
  .sinoui-scrollbar__vertical-thumb {
    background-image: linear-gradient(
      -131deg,
      rgb(231, 176, 43) 0%,
      rgb(193, 62, 81) 100%
    );
  }
`;

export const 自定义滚动条样式 = () => (
  <CustomScrollBar
    style={{
      height: 500,
      width: 800,
      margin: '50px auto',
      background: 'rgb(245, 245, 245)',
    }}
  >
    <div
      style={{
        height: 1000,
      }}
    >
      这是一条数据
    </div>
  </CustomScrollBar>
);

const Row = styled.div`
  width: 100%;
  border: 1px solid blue;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const FlexWrapDemo = () => (
  <div
    style={{
      padding: 16,
      border: '1px solid red',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Row>
        <div
          style={{
            width: 160,
            height: 100,
          }}
        />
        <Scrollbar
          style={{
            flex: 1,
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 10000,
              height: 200,
              backgroundColor: 'yellow',
            }}
          />
        </Scrollbar>
      </Row>
    </div>
  </div>
);

export const FlexWrap中使用横向滚动条 = () => <FlexWrapDemo />;

const TextInput = React.lazy(() => import('@sinoui/core/TextInput'));

function LazyLoadDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [number, setNumber] = useState(1);
  const inputs = range(0, number).map((i) => (
    <div
      style={{
        margin: 8,
      }}
      key={i}
    >
      <TextInput
        style={{ width: 1000 }}
        variant="outlined"
        label="测试"
        value="张三"
      />
    </div>
  ));

  return (
    <div>
      <Button onClick={() => setNumber(number + 1)}>新增</Button>
      <Scrollbar
        style={{
          width: 300,
          height: 50,
        }}
        ref={scrollRef}
      >
        <React.Suspense fallback={null}>
          <div
            style={{
              width: 1000,
              padding: 16,
            }}
          >
            {inputs}
          </div>
        </React.Suspense>
      </Scrollbar>
    </div>
  );
}

export const 异步加载 = () => (
  <StoryLayout>
    <LazyLoadDemo />
  </StoryLayout>
);

function LazyLoadDemo2() {
  const [number, setNumber] = useState(1);
  const inputs = range(0, number).map((i) => (
    <TextInput
      style={{ width: 1000 }}
      variant="outlined"
      label="测试"
      value="张三"
      key={i}
    />
  ));

  return (
    <div>
      <Button onClick={() => setNumber(number + 1)}>新增</Button>
      <React.Suspense fallback={null}>
        <Scrollbar
          style={{
            width: 300,
            height: 50,
          }}
        >
          <div
            style={{
              width: 1000,
              padding: 16,
            }}
          >
            {inputs}
          </div>
        </Scrollbar>
      </React.Suspense>
    </div>
  );
}

export const 异步加载2 = () => (
  <StoryLayout>
    <LazyLoadDemo2 />
  </StoryLayout>
);
