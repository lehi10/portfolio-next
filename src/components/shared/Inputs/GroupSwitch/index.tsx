import { Checkbox } from 'antd';
import type {
  CheckboxOptionType,
  CheckboxValueType,
} from 'antd/es/checkbox/Group';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export const ColumnCheckbox = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  .ant-checkbox-group-item {
    margin-inline-start: 0;
  }
`;

export interface CheckboxGroupProps {
  options: (CheckboxOptionType | number | string)[];
  onChange: (value: CheckboxValueType[]) => void;
}

const CheckBoxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  return (
    <>
      <ColumnCheckbox
        options={options}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </>
  );
};

export default CheckBoxGroup;
