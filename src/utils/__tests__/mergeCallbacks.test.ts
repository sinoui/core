import mergeCallbacks from '../mergeCallbacks';

it('合并多个回调函数', () => {
  const callback1 = jest.fn();
  const callback2 = null;
  const callback3 = jest.fn();
  const callback4 = undefined;

  const callback = mergeCallbacks(callback1, callback2, callback3, callback4);

  callback(1, 2, 3);

  expect(callback1).toBeCalledWith(1, 2, 3);
  expect(callback3).toBeCalledWith(1, 2, 3);
});
