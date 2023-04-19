import styled from 'styled-components';
import { Collapse } from 'antd';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const CustomCollapse = styled(Collapse)`
  .ant-checkbox {
    top: 0px;
  }
`;

export { MainContainer, CustomCollapse, LabelContainer };
