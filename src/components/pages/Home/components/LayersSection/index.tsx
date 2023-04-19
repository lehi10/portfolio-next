import { Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import MarkerIcon from 'components/icons/svgIcons/mapMarker';
import PolygonIcon from 'components/icons/svgIcons/polygon';
import RouteIcon from 'components/icons/svgIcons/route';
import CheckBoxGroup from 'components/shared/Inputs/GroupSwitch';
import { ReactNode } from 'react';
import { MainContainer, CustomCollapse, LabelContainer } from './styles';
const { Panel } = CustomCollapse;

interface LabelCheckboxProps {
  label: string;
  icon: ReactNode;
}
const LabelCheckbox: React.FC<LabelCheckboxProps> = ({ label, icon }) => {
  return (
    <LabelContainer>
      {icon}
      <Typography>{label}</Typography>
    </LabelContainer>
  );
};

const options = [
  {
    label: (
      <LabelCheckbox label="Transito" icon={<RouteIcon color={'red'} />} />
    ),
    value: 'layer1',
  },
  {
    label: (
      <LabelCheckbox label="Población" icon={<RouteIcon color={'green'} />} />
    ),
    value: 'layer2',
  },
];

const options2 = [
  {
    label: (
      <LabelCheckbox
        label="Puntos de venta"
        icon={<MarkerIcon color={'orange'} />}
      />
    ),
    value: 'layer1',
  },
  {
    label: (
      <LabelCheckbox label="Paraderos" icon={<MarkerIcon color={'blue'} />} />
    ),
    value: 'layer2',
  },
];

const options3 = [
  {
    label: (
      <LabelCheckbox label="Tren" icon={<PolygonIcon color={'brown'} />} />
    ),
    value: 'layer1',
  },
  {
    label: (
      <LabelCheckbox label="Ciclovia" icon={<PolygonIcon color={'purple'} />} />
    ),
    value: 'layer2',
  },
];

interface LayerSectionPrpos {
  onChange?: (key: string, layers: string[]) => void;
}
const LayersSection: React.FC<LayerSectionPrpos> = ({ onChange }) => {
  return (
    <MainContainer>
      <CustomCollapse
        bordered={false}
        defaultActiveKey={['1', '2']}
        expandIconPosition="end"
      >
        <Panel header="Seleccione las capas" key="1">
          <CheckBoxGroup
            options={options}
            onChange={(e: any) => {
              onChange && onChange('1', e);
            }}
          />
        </Panel>
        <Panel header="Seleccione los puntos de interes" key="2">
          <CheckBoxGroup
            options={options2}
            onChange={(e: any) => {
              onChange && onChange('2', e);
            }}
          />
        </Panel>
        <Panel header="Seleccione rutas" key="3">
          <CheckBoxGroup
            options={options3}
            onChange={(e: any) => {
              onChange && onChange('3', e);
            }}
          />
        </Panel>
      </CustomCollapse>
    </MainContainer>
  );
};
export default LayersSection;
