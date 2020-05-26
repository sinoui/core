import React from 'react';
import { OptionList } from '@sinoui/core/AutoComplete';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Body1 from '@sinoui/core/Body1';
import styled from 'styled-components';
import './index.css';

const ListSubheader = styled.div`
  color: ${({ theme }) => theme.palette.text.secondary};
  background-color: ${({ theme }) => theme.palette.background.paper};
  line-height: 48px;
  padding: 0 16px;
  z-index: 1;
`;

const handleOptions = (options: string[], groupBy: any) => {
  const input = '';
  const filteredOptions = options.filter((option) => {
    const candidate = option;

    return candidate.indexOf(input) > -1;
  });

  let groupedOptions = filteredOptions;
  if (groupBy) {
    // used to keep track of key and indexes in the result array
    const indexBy = new Map();
    let warn = false;

    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);

      if (acc.length > 0 && acc[acc.length - 1].groupTitle === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          if (indexBy.get(group) && !warn) {
            console.warn(
              `Material-UI: The options provided combined with the \`groupBy\` method of ${componentName} returns duplicated headers.`,
              'You can solve the issue by sorting the options with the output of `groupBy`.',
            );
            warn = true;
          }
          indexBy.set(group, true);
        }

        acc.push({
          key: index,
          index,
          groupTitle: group,
          options: [option],
        });
      }

      return acc;
    }, []);
  }

  return groupedOptions;
};

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const itemCount = itemData.length;
    const itemSize = 48;

    const getChildSize = (child: React.ReactNode) => {
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  },
);

function random(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a: string, b: string) =>
    a.toUpperCase().localeCompare(b.toUpperCase()),
  );

const renderGroup = (params) => [
  <ListSubheader key={params.key}>{params.groupTitle}</ListSubheader>,
  params.children,
];

export default function OptionListWithReactWindow() {
  const groupedOptions = handleOptions(OPTIONS, (option) =>
    option[0].toUpperCase(),
  );

  return (
    <OptionList
      id="virtualize-demo"
      style={{ width: 300 }}
      disableListWrap
      ListboxComponent={
        ListboxComponent as React.ComponentType<
          React.HTMLAttributes<HTMLElement>
        >
      }
      renderGroup={renderGroup}
      options={groupedOptions}
      groupBy={(option) => option.groupTitle}
      renderOption={(option) => <Body1>{option}</Body1>}
    />
  );
}
