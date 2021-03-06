import 'styled-components';
import { Theme } from '@sinoui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    __version?: string;
  }
}

declare module 'react' {
  interface FunctionComponent<P = {}> {
    sinouiName?: string;
  }

  interface NamedExoticComponent {
    sinouiName?: string;
  }
}
