/* eslint-disable no-plusplus */
import { useState } from 'react';

let idSeed = 0;

/**
 * 生成id
 *
 * @param {string} prefix id的前缀
 *
 * @returns {string} 返回生成的id
 */
function useId(prefix: string) {
  const [id] = useState(() => {
    return `${prefix}_${idSeed++}_${Math.random() * 1000}`;
  });

  return id;
}

export default useId;
