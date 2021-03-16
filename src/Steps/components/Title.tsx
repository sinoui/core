import styled from 'styled-components';

const Title = styled.span<{ $active?: boolean; $error?: boolean }>`
  color: ${({ theme, $active, $error }) =>
    // eslint-disable-next-line no-nested-ternary
    $active
      ? theme.palette.text.primary
      : $error
      ? theme.palette.error.main
      : theme.palette.text.disabled};
  font-size: 14px;
  line-height: 24px;
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular};
`;

export default Title;
