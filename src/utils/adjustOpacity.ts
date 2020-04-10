import { parseToHsl, hsla } from 'polished';

/**
 * 执行结果的缓存
 */
const resultCache: Record<string, string> = {};

/**
 * 设置颜色的透明度
 *
 * @param opacity 透明度。取值区间为`[0, 1]`
 * @param color 颜色
 */
export default function adjustOpacity(opacity: number, color: string) {
  const cacheKey = `${color}_${opacity}`;
  let cachedResult = resultCache[cacheKey];
  if (!cachedResult) {
    const hsl = parseToHsl(color);

    cachedResult = hsla(
      hsl.hue,
      hsl.saturation,
      hsl.lightness,
      opacity,
    ).toString();

    resultCache[cacheKey] = cachedResult;
  }
  return cachedResult;
}
