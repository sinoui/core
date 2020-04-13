import classNames from 'classnames';

/**
 * 生成 bem 风格的 css 类
 *
 * @param className 基础 css 类名
 * @param modifiers 修饰器
 * @param classes 其它 css 类名
 */
export default function bemClassNames(
  className: string,
  modifiers: Record<string, boolean | undefined>,
  ...classes: ClassValue[]
) {
  return classNames(
    className,
    Object.keys(modifiers)
      .filter((modifier) => modifiers[modifier])
      .map(
        (modifier) =>
          `${className}--${modifier.replace(
            /[A-Z]/g,
            (letter) => `-${letter.toLowerCase()}`,
          )}`,
      ),
    ...classes,
  );
}

/* ---- 以下类型定义摘自 @types/classnames/types.d.ts ---- */

/**
 * css 类数组
 */
export type ClassArray = Array<ClassValue>; // tslint:disable-line no-empty-interface

/**
 * css 类字典
 */
export interface ClassDictionary {
  [id: string]: any;
}

/**
 * css 类值
 */
export type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassArray
  | undefined
  | null
  | boolean;
