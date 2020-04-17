import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';
import FormControl from '@sinoui/core/FormControl';
import TextInput from '@sinoui/core/TextInput';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import { Row, Column } from '@sinoui/core/Grid';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';
import H4 from '@sinoui/core/H4';
import PersonRounded from '@sinoui/icons/PersonRounded';
import EmailRounded from '@sinoui/icons/EmailRounded';
import PhoneRounded from '@sinoui/icons/PhoneRounded';

export default {
  title: 'Form',
};

export const 水平布局 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div>
      <H4>标准模式</H4>
      <div style={{ margin: 16 }}>
        <form>
          <FormControl
            layout="horizontal"
            label="用户名"
            helperText="用户名首字母大写"
          >
            <TextInput placeholder="请输入用户名" variant="filled" />
          </FormControl>

          <FormControl layout="horizontal" label="爱好">
            <CheckboxGroup>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
            </CheckboxGroup>
          </FormControl>

          <FormControl layout="horizontal" label="性别">
            <RadioGroup>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormControl>
          <FormControl
            layout="horizontal"
            label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
          >
            <TextInput multiline placeholder="说明" variant="outlined" />
          </FormControl>
        </form>
      </div>
      <H4>密集模式</H4>
      <div style={{ margin: 16 }}>
        <form>
          <FormControl
            layout="horizontal"
            label="用户名"
            helperText="用户名首字母大写"
            dense
          >
            <TextInput placeholder="请输入用户名" dense variant="filled" />
          </FormControl>

          <FormControl layout="horizontal" label="爱好" dense>
            <CheckboxGroup dense>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
            </CheckboxGroup>
          </FormControl>

          <FormControl layout="horizontal" label="性别" dense>
            <RadioGroup dense>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormControl>
          <FormControl
            layout="horizontal"
            label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
            dense
          >
            <TextInput multiline placeholder="说明" dense variant="outlined" />
          </FormControl>
        </form>
      </div>

      <H4>FormLabel设置为固定宽度</H4>
      <div style={{ margin: 16 }}>
        <form>
          <FormControl
            layout="horizontal"
            label="用户名"
            labelWidth={120}
            helperText="用户名首字母大写"
            dense
          >
            <TextInput placeholder="请输入用户名" dense variant="filled" />
          </FormControl>

          <FormControl layout="horizontal" label="爱好" labelWidth={120} dense>
            <CheckboxGroup dense>
              <Checkbox value="1">复选框1</Checkbox>
              <Checkbox value="2">复选框2</Checkbox>
              <Checkbox value="3">复选框3</Checkbox>
              <Checkbox value="4">复选框4</Checkbox>
            </CheckboxGroup>
          </FormControl>

          <FormControl layout="horizontal" label="性别" labelWidth={120} dense>
            <RadioGroup dense>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </RadioGroup>
          </FormControl>
          <FormControl
            layout="horizontal"
            label="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
            labelWidth={120}
            dense
          >
            <TextInput multiline placeholder="说明" dense variant="outlined" />
          </FormControl>
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
            <FormControl label="标题" variant="outlined" disabled>
              <TextInput variant="outlined" disabled />
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="姓名" variant="outlined">
              <TextInput variant="outlined" />
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="姓名2" variant="outlined">
              <TextInput variant="outlined" />
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="性别">
              <RadioGroup block>
                <Radio value="female">女</Radio>
                <Radio value="male">男</Radio>
              </RadioGroup>
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="喜好">
              <CheckboxGroup column>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
              </CheckboxGroup>
            </FormControl>
          </Column>
        </Row>
      </div>

      <H4>填充模式</H4>
      <div style={{ margin: 16 }}>
        <Row gutter={48}>
          <Column sm={24}>
            <FormControl label="标题" variant="outlined">
              <TextInput variant="filled" id="userName" />
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="姓名" id="userName" variant="outlined">
              <TextInput variant="filled" id="userName" />
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="姓名2" id="userName2" variant="outlined">
              <TextInput variant="filled" id="userName2" />
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="性别">
              <RadioGroup block>
                <Radio value="female">女</Radio>
                <Radio value="male">男</Radio>
              </RadioGroup>
            </FormControl>
          </Column>
          <Column sm={12}>
            <FormControl label="喜好">
              <CheckboxGroup column>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
                <Checkbox value="足球">足球</Checkbox>
              </CheckboxGroup>
            </FormControl>
          </Column>
        </Row>

        <H4>轮廓模式（标准标签）</H4>
        <div style={{ margin: 16 }}>
          <Row gutter={48}>
            <Column sm={24}>
              <FormControl
                label="标题"
                variant="outlined"
                disabled
                labelLayout="standard"
              >
                <TextInput variant="outlined" disabled />
              </FormControl>
            </Column>
            <Column sm={12}>
              <FormControl
                label="姓名"
                variant="outlined"
                labelLayout="standard"
              >
                <TextInput variant="outlined" />
              </FormControl>
            </Column>
            <Column sm={12}>
              <FormControl
                label="姓名2"
                variant="outlined"
                labelLayout="standard"
              >
                <TextInput variant="outlined" />
              </FormControl>
            </Column>
            <Column sm={12}>
              <FormControl label="性别" labelLayout="standard">
                <RadioGroup block>
                  <Radio value="female">女</Radio>
                  <Radio value="male">男</Radio>
                </RadioGroup>
              </FormControl>
            </Column>
            <Column sm={12}>
              <FormControl label="喜好" labelLayout="standard">
                <CheckboxGroup column>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                  <Checkbox value="足球">足球</Checkbox>
                </CheckboxGroup>
              </FormControl>
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
          <FormControl label="标题" labelLayout="floating" variant="outlined">
            <TextInput variant="outlined" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="姓名" labelLayout="floating" variant="outlined">
            <TextInput variant="outlined" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="姓名2" labelLayout="floating" variant="outlined">
            <TextInput variant="outlined" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="性别">
            <RadioGroup>
              <Radio value="female">女</Radio>
              <Radio value="male">男</Radio>
            </RadioGroup>
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="喜好">
            <CheckboxGroup>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
              <Checkbox value="足球">足球</Checkbox>
            </CheckboxGroup>
          </FormControl>
        </Column>
      </Row>
    </div>
  </ThemeProvider>
);

export const Demo1 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ margin: 16, width: '600px' }}>
      <h4>Create task</h4>
      <Row gutter={48}>
        <Column xs={24}>
          <FormControl label="Type" labelLayout="floating" variant="filled">
            <TextInput variant="filled" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="Company" labelLayout="floating" variant="filled">
            <TextInput variant="filled" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl
            label="Opportunity"
            labelLayout="floating"
            variant="filled"
            helperText="Optional"
          >
            <TextInput variant="filled" />
          </FormControl>
        </Column>
        <Column xs={24}>
          <FormControl
            label="Task name"
            labelLayout="floating"
            variant="filled"
          >
            <TextInput variant="filled" />
          </FormControl>
        </Column>
        <Column xs={24}>
          <FormControl
            label="CC"
            labelLayout="floating"
            variant="filled"
            helperText="Optional"
          >
            <TextInput variant="filled" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="Nature of request">
            <CheckboxGroup column>
              <Checkbox value="1">Ads review</Checkbox>
              <Checkbox value="2">Keywords review</Checkbox>
              <Checkbox value="3">Extensions review</Checkbox>
            </CheckboxGroup>
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="Current reviewable status">
            <RadioGroup value="1" column>
              <Radio value="1">Approved</Radio>
              <Radio value="2">Not approved</Radio>
            </RadioGroup>
          </FormControl>
        </Column>
      </Row>
    </div>
  </ThemeProvider>
);

function FormDemo2() {
  const [value, setValue] = useState<{
    type?: string;
    company?: string;
    opportunity?: string;
    taskName?: string;
    cc?: string;
  }>({});

  const onChange = (fieldName: string, newValue: string) => {
    setValue({
      ...value,
      [fieldName]: newValue,
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ margin: 16, width: '600px' }}>
        <h4>Create task</h4>
        <Row gutter={48}>
          <Column xs={24}>
            <FormControl
              label="Type"
              labelLayout="floating"
              variant="outlined"
              filled={!!value.type}
            >
              <TextInput
                variant="outlined"
                value={value.type}
                onChange={(e) => onChange('type', e.target.value)}
              />
            </FormControl>
          </Column>
          <Column xs={12}>
            <FormControl
              label="Company"
              labelLayout="floating"
              variant="outlined"
              filled={!!value.company}
            >
              <TextInput
                variant="outlined"
                onChange={(e) => onChange('company', e.target.value)}
              />
            </FormControl>
          </Column>
          <Column xs={12}>
            <FormControl
              label="Opportunity"
              labelLayout="floating"
              variant="outlined"
              helperText="Optional"
              filled={!!value.opportunity}
            >
              <TextInput
                variant="outlined"
                onChange={(e) => onChange('opportunity', e.target.value)}
              />
            </FormControl>
          </Column>
          <Column xs={24}>
            <FormControl
              label="Task name"
              labelLayout="floating"
              variant="outlined"
              filled={!!value.taskName}
            >
              <TextInput
                variant="outlined"
                onChange={(e) => onChange('taskName', e.target.value)}
              />
            </FormControl>
          </Column>
          <Column xs={24}>
            <FormControl
              label="CC"
              labelLayout="floating"
              variant="outlined"
              helperText="Optional"
              filled={!!value.cc}
            >
              <TextInput
                variant="outlined"
                onChange={(e) => onChange('cc', e.target.value)}
              />
            </FormControl>
          </Column>
          <Column xs={12}>
            <FormControl label="Nature of request">
              <CheckboxGroup column>
                <Checkbox value="1">Ads review</Checkbox>
                <Checkbox value="2">Keywords review</Checkbox>
                <Checkbox value="3">Extensions review</Checkbox>
              </CheckboxGroup>
            </FormControl>
          </Column>
          <Column xs={12}>
            <FormControl label="Current reviewable status">
              <RadioGroup value="1" column>
                <Radio value="1">Approved</Radio>
                <Radio value="2">Not approved</Radio>
              </RadioGroup>
            </FormControl>
          </Column>
        </Row>
      </div>
    </ThemeProvider>
  );
}

export const Demo2 = () => <FormDemo2 />;

export const Demo3 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ margin: 16, width: '600px' }}>
      <h4>Checkout form</h4>
      <Row gutter={48}>
        <Column xs={12}>
          <FormControl
            label={<PersonRounded />}
            layout="horizontal"
            labelLayout="standard"
            variant="standard"
            labelWidth={40}
            colon={false}
          >
            <TextInput placeholder="First name" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl
            label={<PersonRounded />}
            layout="horizontal"
            labelLayout="standard"
            variant="standard"
            labelWidth={40}
            colon={false}
          >
            <TextInput placeholder="Last name" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl
            label={<EmailRounded />}
            layout="horizontal"
            labelLayout="standard"
            variant="standard"
            labelWidth={40}
            colon={false}
          >
            <TextInput placeholder="Email" />
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl
            label={<PhoneRounded />}
            layout="horizontal"
            labelLayout="standard"
            variant="standard"
            labelWidth={40}
            colon={false}
          >
            <TextInput placeholder="Phone" />
          </FormControl>
        </Column>
        <Column xs={24}>
          <FormControl label="Address" labelLayout="floating">
            <TextInput />
          </FormControl>
        </Column>
        <Column xs={24}>
          <FormControl label="Additional info">
            <TextInput multiline />
          </FormControl>
        </Column>
      </Row>
      <div>
        <h4>Card Details</h4>
        <Row gutter={48}>
          <Column xs={8}>
            <FormControl>
              <RadioGroup column>
                <Radio value="1">Javascript</Radio>
                <Radio value="2">Typescript</Radio>
                <Radio value="3">css</Radio>
              </RadioGroup>
            </FormControl>
          </Column>
          <Column xs={16}>
            <FormControl label="Name on card">
              <TextInput />
            </FormControl>
            <Row gutter={8}>
              <Column xs={20}>
                <FormControl label="Card number">
                  <TextInput />
                </FormControl>
              </Column>
              <Column xs={4}>
                <FormControl label="CVV2">
                  <TextInput />
                </FormControl>
              </Column>
            </Row>
            <Row gutter={8}>
              <Column xs={12}>
                <FormControl label="Card exp month">
                  <TextInput />
                </FormControl>
              </Column>
              <Column xs={12}>
                <FormControl label="Year">
                  <TextInput />
                </FormControl>
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
    </div>
  </ThemeProvider>
);

export const Demo4 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ margin: 16, width: '600px' }}>
      <h4>Description</h4>
      <Row gutter={8}>
        <Column xs={24}>
          <FormControl label="Title" variant="filled">
            <TextInput variant="filled" value="Pingan Dress" />
          </FormControl>
        </Column>
        <Column xs={6}>
          <FormControl label="price" variant="filled">
            <TextInput variant="filled" value="$10" />
          </FormControl>
        </Column>
        <Column xs={18}>
          <FormControl label="Location" variant="filled" filled>
            <TextInput placeholder="Placeholder text" variant="filled" />
          </FormControl>
        </Column>
      </Row>
    </div>
  </ThemeProvider>
);

export const Demo5 = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ margin: 16, width: '600px' }}>
      <h4>Description</h4>
      <Row gutter={8}>
        <Column xs={24}>
          <FormControl label="Title" variant="outlined">
            <TextInput variant="outlined" value="Pingan Dress" />
          </FormControl>
        </Column>
        <Column xs={6}>
          <FormControl label="price" variant="outlined">
            <TextInput variant="outlined" value="$10" />
          </FormControl>
        </Column>
        <Column xs={18}>
          <FormControl label="Location" variant="outlined">
            <TextInput placeholder="Placeholder text" variant="outlined" />
          </FormControl>
        </Column>
      </Row>
    </div>
  </ThemeProvider>
);
