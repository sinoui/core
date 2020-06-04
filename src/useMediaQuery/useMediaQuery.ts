import { useState, useEffect } from 'react';

/**
 * 媒体查询匹配
 *
 * @param queryInput 媒体查询条件
 */
export default function useMediaQuery(queryInput: string) {
  const query = queryInput.replace(/^@media( ?)/m, '');
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  const [match, setMatch] = useState(
    () => supportMatchMedia && matchMedia(query).matches,
  );

  useEffect(() => {
    if (!supportMatchMedia) {
      return undefined;
    }

    let active = true;
    const mediaQueryList = matchMedia(query);
    const updateMatch = () => {
      if (active) {
        setMatch(mediaQueryList.matches);
      }
    };
    updateMatch();
    mediaQueryList.addListener(updateMatch);
    return () => {
      active = false;
      mediaQueryList.removeListener(updateMatch);
    };
  }, [query, supportMatchMedia]);

  return match;
}
