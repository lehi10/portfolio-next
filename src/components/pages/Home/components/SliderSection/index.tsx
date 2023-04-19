import { Tabs, Button } from 'antd';
import CustomSlider from 'components/shared/Inputs/Slider';
import { useState } from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const MainContainer = styled.div`
  padding: 10px 30px;
`;

interface SlidersProps {
  onChange: (value: number, tab: string) => void;
  defaultTab?: string;
}

export const DEFAULT_TAB = 'radius';

const SliderSection: React.FC<SlidersProps> = ({ onChange, defaultTab }) => {
  const [tab, setTab] = useState(defaultTab || DEFAULT_TAB);
  const [radius, setRadius] = useState<number>(0);
  const [isochronous, setIsochronous] = useState<number>(0);

  const handleChange = (value: number) => {
    onChange(value, tab);
    if (tab === 'radius') setRadius(value);
    else if (tab === 'isochronous') setIsochronous(value);
  };

  const handleChageTab = (currentTab: string, value?: number) => {
    setTab(currentTab);
    if (currentTab === 'radius') onChange(value || radius, currentTab);
    else if (currentTab === 'isochronous')
      onChange(value || isochronous, currentTab);
  };

  return (
    <MainContainer>
      <Tabs
        defaultActiveKey={DEFAULT_TAB}
        onChange={handleChageTab}
        tabBarExtraContent={
          <>
            <Button
              size="small"
              onClick={() => {
                setIsochronous(0);
                setRadius(0);
                handleChageTab(tab);
              }}
            >
              <CloseOutlined />
            </Button>
          </>
        }
        items={[
          {
            label: 'Radio',
            key: 'radius',
            children: (
              <>
                <CustomSlider
                  start={0}
                  end={1000}
                  max={1000}
                  unitOfMeasurement="mts"
                  value={radius}
                  onChange={handleChange}
                />
              </>
            ),
          },
          {
            label: 'Isocrona',
            key: 'isochronous',
            children: (
              <>
                <CustomSlider
                  start={0}
                  end={60}
                  max={60}
                  unitOfMeasurement="Min"
                  value={isochronous}
                  onChange={handleChange}
                />
              </>
            ),
          },
        ]}
      />
    </MainContainer>
  );
};

export default SliderSection;
