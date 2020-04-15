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
