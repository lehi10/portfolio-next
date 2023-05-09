import { Tabs, Button } from 'antd';
import CustomSlider from 'components/shared/Inputs/Slider';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { debounce } from "lodash"



const MainContainer = styled.div`
  padding: 10px 30px;
`;

interface SlidersProps {
  onChange: (value: number, tab: string) => void;
  defaultTab?: string;
  map?: google.maps.Map,
  selected: any,
  onGetIsochron?: (polygon: google.maps.Polygon)=> void;
}

export const DEFAULT_TAB = 'radius';

const SliderSection: React.FC<SlidersProps> = ({ onChange, defaultTab, map, selected, onGetIsochron }) => {
  const [tab, setTab] = useState(defaultTab || DEFAULT_TAB);
  const [radius, setRadius] = useState<number>(0);
  const [isochronous, setIsochronous] = useState<number>(0);


  const handleChange = debounce(async (value: number, transportation?: string) => {
    if(!map) return;
    
    map.data.forEach(function(feature) {
      map.data.remove(feature);
    });
    
    onChange(value, tab);
    if (tab === 'radius') setRadius(value);
    else if (tab === 'isochronous') {
      const body = {
        ...selected,
        transportation: transportation,
        time: value*60,
      };
      const header = {
        'Content-Type': 'application/json',
      };
      const response = await fetch("/api/isochrone",{method: 'POST', headers: header, body: JSON.stringify(body) }).then((res)=> res.json());
      const currentPoints = response.data.features[0].geometry.coordinates[0][0];
      const polyPoints = currentPoints.map((po: number[])=>{return {lat: po[1], lng: po[0]}});
      const newIsochrone = new google.maps.Polygon({
          paths: polyPoints,
          strokeColor: "rgb(245, 166, 35)",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "rgb(245, 166, 35)",
          fillOpacity: 0.35,
        });
        onGetIsochron && onGetIsochron(newIsochrone);
      //newIsochrone.setMap(map);
    }
  }, 500);

  

  const handleChageTab = (currentTab: string, value?: number) => {
    setTab(currentTab);
    if (currentTab === 'radius') onChange(value || radius, currentTab);
    else if (currentTab === 'isochronous')
      onChange(value || isochronous, currentTab);
  };

  if (!window.google || !window.google.maps) {
    return<>Loading</>;  
  }

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
                  allowSelectTransportation
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
