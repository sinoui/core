import NODE_ENV from '@sinoui/core/utils/env';

const $body = document.querySelector('body') as HTMLBodyElement;
let scrollPosition = 0;

export default {
  enable() {
    scrollPosition = window.pageYOffset;
    $body.style.overflow = 'hidden';
    $body.style.position = 'fixed';
    $body.style.top = `-${scrollPosition}px`;
    $body.style.width = '100%';
  },
  disable() {
    $body.style.removeProperty('overflow');
    $body.style.removeProperty('position');
    $body.style.removeProperty('top');
    $body.style.removeProperty('width');
    if (NODE_ENV !== 'test') {
      window.scrollTo(0, scrollPosition);
    }
  },
};
