import { Avatar } from 'antd';
import styled from 'styled-components';

const CustomAvatar = styled(Avatar)`
  text-tramsform: uppercase;
  box-shadow: 5px 5px 5px #aaaaaa;
`;

interface CountryFlagProps {
  name?: string;
  image?: string;
}
const CountryFlag: React.FC<CountryFlagProps> = ({ name, image }) => {
  return (
    <>
      <CustomAvatar size={'large'} src={image}>
        {name && name.slice(0, 2)}
      </CustomAvatar>
    </>
  );
};

export default CountryFlag;
