import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import Dialog from '@sinoui/core/Dialog';
import DialogTitle from '@sinoui/core/DialogTitle';
import DialogContent from '@sinoui/core/DialogContent';
import DialogActions from '@sinoui/core/DialogActions';
import Button from '@sinoui/core/Button';

describe('Dialog组件 单元测试', () => {
  test('测试显示关闭按钮', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Dialog showCloseIcon>
          <DialogTitle data-testid="dialogTitle">
            Use Google location service?
          </DialogTitle>
          <DialogContent>
            Let Google help apps determine location. This means sending
            anonymous location data toGoogle, even when no apps are running.
          </DialogContent>
          <DialogActions>
            <Button>Disagree</Button>
            <Button>Agree</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>,
    );

    const title = getByTestId('dialogTitle');
    expect(title.firstElementChild).toHaveClass('sinoui-dialog-title__icon');
  });

  test('测试全屏显示', () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
        <Dialog fullScreen data-testid="dialog">
          <DialogTitle>Use Google location service?</DialogTitle>
          <DialogContent>
            Let Google help apps determine location. This means sending
            anonymous location data toGoogle, even when no apps are running.
          </DialogContent>
          <DialogActions>
            <Button>Disagree</Button>
            <Button>Agree</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>,
    );

    const test = getAllByTestId('dialog')[0];
    expect(test).toHaveStyle('width:100%;height:100%');
  });
});

describe('Dialog组件 快照测试', () => {
  // it('基本使用', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // it('不显示遮罩层', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog backdrop={false}>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // it('显示关闭图标', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog showCloseIcon>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // it('设置弹窗不可以拖拽', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog draggable={false}>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // it('设置全屏显示', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog fullScreen>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // it('对话框将根据maxWidth的值进行自我调整', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog fullWidth>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // it('宽度自适应', () => {
  //   const tree = renderer
  //     .create(
  //       <ThemeProvider theme={defaultTheme}>
  //         <Dialog autoWidth>
  //           <DialogTitle>Use Google location service?</DialogTitle>
  //           <DialogContent>
  //             Let Google help apps determine location. This means sending
  //             anonymous location data toGoogle, even when no apps are running.
  //           </DialogContent>
  //           <DialogActions>
  //             <Button>Disagree</Button>
  //             <Button>Agree</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </ThemeProvider>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
