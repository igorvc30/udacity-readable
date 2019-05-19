import React from 'react';
import { Input, Radio } from 'antd';

export const getFieldInput = (fieldType, options = ['no options']) => {
  const { TextArea } = Input;
  switch (fieldType) {
    case 'input':
      return <Input />;
    case 'radio':
      return (
        <Radio.Group>
          {options.map(option => (
            <Radio.Button key={option} value={option}>
              {option.toUpperCase()}
            </Radio.Button>
          ))}
        </Radio.Group>
      );
    case 'text':
      return <TextArea autosize={{ minRows: 4, maxRows: 10 }} />;
    default:
      return <Input />;
  }
};

export const getFieldConfig = (fieldName, defaultValue, form) => {
  const { getFieldDecorator } = form;
  let decorator = {};

  decorator = getFieldDecorator(`${fieldName}`, {
    initialValue: defaultValue || '',
    validateTrigger: ['onChange', 'onBlur'],
    rules: [
      {
        required: true,
        whitespace: true,
        message: `Please check the ${fieldName} field.`
      }
    ]
  });

  return decorator;
};
