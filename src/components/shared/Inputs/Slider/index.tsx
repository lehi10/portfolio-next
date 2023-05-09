import React, { useEffect, useState } from 'react';
import { RadioChangeEvent, Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import styled from 'styled-components';
import { Input, Radio, Space } from 'antd';

const SliderContainer = styled.div`
  width: 100%;
  padding: 0px 10px;
`;

interface SldiderProps {
  unitOfMeasurement: string;
  start: number;
  end: number;
  max: number;
  value: number;
  allowSelectTransportation?: boolean;
  onChange: (value: number, typeTransport?: string) => void;
}

const CustomSlider: React.FC<SldiderProps> = ({
  start,
  end,
  max,
  unitOfMeasurement,
  value,
  onChange,
  allowSelectTransportation
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [transportation, setTransportation] = useState('walking');

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const marks: SliderMarks = {
    [start]: {
      label: (
        <strong>
          {start} {unitOfMeasurement}
        </strong>
      ),
    },
    [end]: {
      label: (
        <strong>
          {end} {unitOfMeasurement}
        </strong>
      ),
    },
  };

  const handleChange = (val: number) => {
    setCurrentValue(val);
    onChange(val, transportation);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setTransportation(e.target.value);
  };

  return (
    <SliderContainer>
      {allowSelectTransportation && (
         <Radio.Group onChange={onChangeRadio} value={transportation}>
         <Space direction="vertical">
           <Radio value={'driving'}>En auto</Radio>
           <Radio value={'walking'}>Caminando</Radio>
         </Space>
       </Radio.Group>
      )}
      <Slider
        marks={marks}
        value={currentValue}
        onChange={handleChange}
        max={max}
        dots
      />
    </SliderContainer>
  );
};

export default CustomSlider;
