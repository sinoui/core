import React, { useRef, useEffect, useCallback } from 'react';
import { debounce } from '@sinoui/utils';
import useMultiRefs from '../utils/useMultiRefs';
import resizeTextarea from './resizeTextarea';

interface AutosizeTextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  /**
   * 指定最小展示行数
   */
  minRows?: number;
  /**
   * 指定最大展示行数
   */
  maxRows?: number;
}

const shadowStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  maxHeight: 0,
  minHeight: 0,
  height: 0,
  visibility: 'hidden',
  pointerEvents: 'none',
  transform: 'translateZ(0)',
  overflow: 'hidden',
};

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * 自动计算大小的多行文本域
 */
const AutosizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutosizeTextareaProps
>((props, ref) => {
  const { minRows, maxRows, ...rest } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shadowRef = useRef<HTMLTextAreaElement>(null);
  const textareaRefHandler = useMultiRefs(ref, textareaRef);

  const resizeTextareaCallback = useCallback(() => {
    const shadow = shadowRef.current;
    const textarea = textareaRef.current;
    if (!shadow || !textarea) {
      return;
    }

    resizeTextarea(textarea, shadow, minRows, maxRows);
  }, [maxRows, minRows]);

  useEnhancedEffect(resizeTextareaCallback);

  useEffect(() => {
    const resize = debounce(resizeTextareaCallback);
    window.addEventListener('resize', resize, false);
    return () => {
      resize.cancel();
      window.removeEventListener('resize', resize, false);
    };
  }, [resizeTextareaCallback]);

  return (
    <>
      <textarea ref={textareaRefHandler} rows={minRows} {...rest} />
      <textarea
        className={rest.className}
        ref={shadowRef}
        tabIndex={-1}
        aria-hidden="true"
        style={{ ...rest.style, ...shadowStyle }}
      />
    </>
  );
});

export default AutosizeTextarea;
