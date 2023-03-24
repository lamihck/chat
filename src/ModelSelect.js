import { Select } from 'antd';
import React, { useEffect } from 'react';

const { Option } = Select;

export function ModelSelect(props) {
  const options = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'gpt-4-32k', label: 'gpt-4-32k' },
  ];

  useEffect(() => {
    props.onChange && props.onChange(props.defaultValue || options[0].value)
  }, [])
  

  const handleChange = (value) => {
    props.onChange && props.onChange(value.value)
  };
  
  return (
    <Select defaultValue={props.defaultValue || options[0]} style={{ width: 120 }} onChange={handleChange}>
      {
        options.map((option) => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))
      }
    </Select>
  );
}