/**
 * @jest-environment jsdom
 */
/* eslint-disable no-param-reassign */
import '@testing-library/jest-dom';
import resizeTextarea from '../resizeTextarea';

function mockLayout(
  shadow: HTMLTextAreaElement,
  contentHeights: Record<string, number> = {
    x: 16,
    '123': 16,
    '1\n2\n3': 48,
  },
) {
  const spy = jest.spyOn(shadow, 'scrollHeight', 'get');
  spy.mockImplementation(() => contentHeights[shadow.value]);
}

function setStyle(element: HTMLElement, style: any) {
  Object.keys(style).forEach((key: any) => {
    element.style[key] = style[key];
  });
}

it('根据内容同步高度', () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  const shadow = document.createElement('textarea') as HTMLTextAreaElement;
  mockLayout(shadow);
  setStyle(textarea, {
    padding: 0,
  });

  resizeTextarea(textarea, shadow);
  expect(textarea).toHaveStyle('height: 16px; overflow: hidden;');

  textarea.value = '123';
  resizeTextarea(textarea, shadow);
  expect(textarea).toHaveStyle('height: 16px; overflow: hidden;');

  textarea.value = '1\n2\n3';
  resizeTextarea(textarea, shadow);
  expect(textarea).toHaveStyle('height: 48px; overflow: hidden;');
});

it('文本域宽度变化后同步高度', () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  const shadow = document.createElement('textarea') as HTMLTextAreaElement;

  textarea.style.width = '100px';
  resizeTextarea(textarea, shadow);

  expect(shadow).toHaveStyle('width: 100px');
});

it('box-sizing: border-box', () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  const shadow = document.createElement('textarea') as HTMLTextAreaElement;
  mockLayout(shadow);

  setStyle(textarea, {
    boxSizing: 'border-box',
  });
  resizeTextarea(textarea, shadow);

  expect(textarea).toHaveStyle('height: 18px; overflow: hidden');
});

it('minRows', () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  const shadow = document.createElement('textarea') as HTMLTextAreaElement;
  mockLayout(shadow);
  setStyle(textarea, {
    padding: 0,
  });

  resizeTextarea(textarea, shadow, 3);

  expect(textarea).toHaveStyle('height: 48px; overflow: hidden');
});

it('maxRows', () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  const shadow = document.createElement('textarea') as HTMLTextAreaElement;
  mockLayout(shadow);
  setStyle(textarea, {
    padding: 0,
  });

  textarea.value = '1\n2\n3';
  resizeTextarea(textarea, shadow, undefined, 2);

  expect(textarea).toHaveStyle('height: 32px; overflow: auto');
});

it('placeholder', () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement;
  const shadow = document.createElement('textarea') as HTMLTextAreaElement;
  mockLayout(shadow);
  setStyle(textarea, {
    padding: 0,
  });

  textarea.placeholder = '1\n2\n3';
  resizeTextarea(textarea, shadow);

  expect(textarea).toHaveStyle('height: 48px; overflow: hidden');
});
