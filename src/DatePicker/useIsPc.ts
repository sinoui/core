import { useTheme } from 'styled-components';
import useMediaQuery from '../useMediaQuery';

export default function useIsPc() {
  const theme = useTheme();
  const isPc = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

  return isPc;
}
