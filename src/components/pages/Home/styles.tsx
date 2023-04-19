import styled from 'styled-components';
import { Layout, AutoComplete } from 'antd';
const { Sider } = Layout;

const MapContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LayoutContainer = styled(Layout)`
  min-height: 100vh;
`;

const SearchLayout = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`;

const AutocompleteInput = styled(AutoComplete)`
  width: 400px;
`;

const SiderContainer = styled(Sider)`
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: grey;
  }
`;

const CornerContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const siderStyle: React.CSSProperties = {
  backgroundColor: 'white',
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
};

export {
  MapContainer,
  LayoutContainer,
  SearchLayout,
  AutocompleteInput,
  SiderContainer,
  siderStyle,
  CornerContainer,
};
