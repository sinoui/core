import elementResizeDetectorMaker from 'element-resize-detector';

let erd: elementResizeDetectorMaker.Erd | undefined;

export default function getErd() {
  if (!erd) {
    erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    });
  }

  return erd;
}
