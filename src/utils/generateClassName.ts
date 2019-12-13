import classNames from 'classnames';

export default function generateClassName(
  className: string,
  props: { [x: string]: boolean | undefined },
) {
  return classNames(className, {
    [`${className}--focused`]: props.focused,
    [`${className}--error`]: props.error,
    [`${className}--disabled`]: props.disabled,
    [`${className}--readonly`]: props.readOnly,
    [`${className}--filled`]: props.filled,
    [`${className}--outlined`]: props.outlined,
  });
}
