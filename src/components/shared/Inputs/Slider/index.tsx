import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import styled from 'styled-components';

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
  onChange: (value: number) => void;
}

const CustomSlider: React.FC<SldiderProps> = ({
  start,
  end,
  max,
  unitOfMeasurement,
  value,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
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
    onChange(val);
  };

  return (
    <SliderContainer>
      <Slider
        marks={marks}
        value={currentValue}
        onChange={handleChange}
        max={max}
      />
    </SliderContainer>
  );
};

export default CustomSlider;
