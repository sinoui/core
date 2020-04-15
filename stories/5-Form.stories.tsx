import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import FormItem from '@sinoui/core/FormItem';
import TextInput from '@sinoui/core/TextInput';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import { Row, Column } from '@sinoui/core/Grid';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';
import H4 from '@sinoui/core/H4';

export default {
  title: 'Form',
};

export const 水平布局 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <H4>标准模式</H4>
      <div style={{ margin: 16 }}>
        <form>
          <FormItem
            layout="horizontal"
            label="用户名"
            helperText="用户名首字母大写"
            error
          >
            <TextInput placeholder="请输入用户名" variant="filled" />
          </FormItem>

          <FormItem layout="horizontal" label="爱好">
            <CheckboxGroup>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem layout="horizontal" label="性别">
            <RadioGroup>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            layout="horizontal"
            label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
          >
            <TextInput multiline placeholder="说明" variant="outlined" />
          </FormItem>
        </form>
      </div>
      <H4>密集模式</H4>
      <div style={{ margin: 16 }}>
        <form>
          <FormItem
            layout="horizontal"
            label="用户名"
            helperText="用户名首字母大写"
            error
            dense
          >
            <TextInput placeholder="请输入用户名" dense variant="filled" />
          </FormItem>

          <FormItem layout="horizontal" label="爱好" dense>
            <CheckboxGroup dense>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem layout="horizontal" label="性别" dense>
            <RadioGroup dense>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            layout="horizontal"
            label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
            dense
          >
            <TextInput multiline placeholder="说明" dense variant="outlined" />
          </FormItem>
        </form>
      </div>

      <H4>FormLabel设置为固定宽度</H4>
      <div style={{ margin: 16 }}>
        <form>
          <FormItem
            layout="horizontal"
            label="用户名"
            labelWidth={120}
            helperText="用户名首字母大写"
            error
            dense
          >
            <TextInput placeholder="请输入用户名" dense variant="filled" />
          </FormItem>

          <FormItem layout="horizontal" label="爱好" labelWidth={120} dense>
            <CheckboxGroup dense>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem layout="horizontal" label="性别" labelWidth={120} dense>
            <RadioGroup dense>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            layout="horizontal"
            label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
            labelWidth={120}
            dense
          >
            <TextInput multiline placeholder="说明" dense variant="outlined" />
          </FormItem>
        </form>
      </div>
    </div>
  </ThemeProvider>
);

export const 垂直布局 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <H4>轮廓模式</H4>
      <div style={{ margin: 16 }}>
        <Row gutter={48}>
          <Column sm={24}>
            <FormItem label="标题" variant="outlined" disabled>
              <TextInput variant="outlined" disabled />
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="姓名" variant="outlined">
              <TextInput variant="outlined" />
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="姓名2" variant="outlined">
              <TextInput variant="outlined" />
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="性别">
              <RadioGroup block>
                <Radio value="female">女</Radio>
                <Radio value="male">男</Radio>
              </RadioGroup>
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="喜好">
              <CheckboxGroup column>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Column>
        </Row>
      </div>

      <H4>填充模式</H4>
      <div style={{ margin: 16 }}>
        <Row gutter={48}>
          <Column sm={24}>
            <FormItem label="标题" variant="outlined">
              <TextInput variant="filled" id="userName" />
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="姓名" id="userName" variant="outlined">
              <TextInput variant="filled" id="userName" />
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="姓名2" id="userName2" variant="outlined">
              <TextInput variant="filled" id="userName2" />
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="性别">
              <RadioGroup block>
                <Radio value="female">女</Radio>
                <Radio value="male">男</Radio>
              </RadioGroup>
            </FormItem>
          </Column>
          <Column sm={12}>
            <FormItem label="喜好">
              <CheckboxGroup column>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Column>
        </Row>

        <H4>轮廓模式（标准标签）</H4>
        <div style={{ margin: 16 }}>
          <Row gutter={48}>
            <Column sm={24}>
              <FormItem
                label="标题"
                variant="outlined"
                disabled
                labelLayout="standard"
              >
                <TextInput variant="outlined" disabled />
              </FormItem>
            </Column>
            <Column sm={12}>
              <FormItem label="姓名" variant="outlined" labelLayout="standard">
                <TextInput variant="outlined" />
              </FormItem>
            </Column>
            <Column sm={12}>
              <FormItem label="姓名2" variant="outlined" labelLayout="standard">
                <TextInput variant="outlined" />
              </FormItem>
            </Column>
            <Column sm={12}>
              <FormItem label="性别" labelLayout="standard">
                <RadioGroup block>
                  <Radio value="female">女</Radio>
                  <Radio value="male">男</Radio>
                </RadioGroup>
              </FormItem>
            </Column>
            <Column sm={12}>
              <FormItem label="喜好" labelLayout="standard">
                <CheckboxGroup column>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Column>
          </Row>
        </div>
      </div>
    </div>
  </ThemeProvider>
);

export const 浮动布局 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ margin: 16 }}>
      <Row gutter={48}>
        <Column xs={24}>
          <FormItem label="标题" labelLayout="floating" variant="outlined">
            <TextInput variant="outlined" />
          </FormItem>
        </Column>
        <Column xs={12}>
          <FormItem label="姓名" labelLayout="floating" variant="outlined">
            <TextInput variant="outlined" />
          </FormItem>
        </Column>
        <Column xs={12}>
          <FormItem label="姓名2" labelLayout="floating" variant="outlined">
            <TextInput variant="outlined" />
          </FormItem>
        </Column>
        <Column xs={12}>
          <FormItem label="性别">
            <RadioGroup>
              <Radio value="female">女</Radio>
              <Radio value="male">男</Radio>
            </RadioGroup>
          </FormItem>
        </Column>
        <Column xs={12}>
          <FormItem label="喜好">
            <CheckboxGroup>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Column>
      </Row>
    </div>
  </ThemeProvider>
);
