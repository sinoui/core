import React, { useState } from 'react';
import FormControl from '@sinoui/core/FormControl';
import { Row, Column } from '@sinoui/core/Grid';
import TextInput from '@sinoui/core/TextInput';
import RadioGroup from '@sinoui/core/RadioGroup';
import Radio from '@sinoui/core/Radio';
import CheckboxGroup from '@sinoui/core/CheckboxGroup';
import Checkbox from '@sinoui/core/Checkbox';

interface FormValues {
  userName?: string;
  sex?: string;
  fav?: string[];
  age?: string;
  description?: string;
}

function FormDemo({
  variant = 'outlined',
  dense,
}: {
  variant?: 'standard' | 'filled' | 'outlined';
  dense?: boolean;
}) {
  const [formValues, setFormValues] = useState<FormValues>({});

  return (
    <form style={{ width: '100%' }}>
      <Row gutter={24}>
        <Column xs={24}>
          <TextInput
            field
            variant={variant}
            label="姓名"
            required
            value={formValues.userName}
            onChange={(event) =>
              setFormValues({ ...formValues, userName: event.target.value })
            }
            dense={dense}
          />
        </Column>
        <Column xs={24}>
          <TextInput
            field
            variant={variant}
            type="number"
            label="年龄"
            value={formValues.age}
            onChange={(event) =>
              setFormValues({ ...formValues, age: event.target.value })
            }
            dense={dense}
          />
        </Column>
        <Column xs={12}>
          <FormControl label="性别" dense={dense}>
            <RadioGroup
              value={formValues.sex}
              onChange={(event) =>
                setFormValues({ ...formValues, sex: event.target.value })
              }
              dense={dense}
            >
              <Radio value="female">女</Radio>
              <Radio value="male">男</Radio>
            </RadioGroup>
          </FormControl>
        </Column>
        <Column xs={12}>
          <FormControl label="兴趣爱好" dense={dense}>
            <CheckboxGroup
              dense={dense}
              value={formValues.fav}
              onChange={(value) => setFormValues({ ...formValues, fav: value })}
            >
              <Checkbox>足球</Checkbox>
              <Checkbox>篮球</Checkbox>
            </CheckboxGroup>
          </FormControl>
        </Column>
        <Column xs={24}>
          <TextInput
            field
            multiline
            minRows={3}
            variant={variant}
            label="简介"
            value={formValues.description}
            onChange={(event) =>
              setFormValues({ ...formValues, description: event.target.value })
            }
            dense={dense}
          />
        </Column>
      </Row>
    </form>
  );
}

export default FormDemo;
