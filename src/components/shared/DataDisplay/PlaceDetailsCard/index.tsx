import { Typography } from 'antd';
import { RootContainer, BodyContainer, ImageContainer, LogoContainer } from './styles';
import Image from 'next/image';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Link from 'next/link';
const { Paragraph } = Typography;

interface PlaceDetailsProps {
  image: string;
  details: any;
}

const PlaceDetailsCard: React.FC<PlaceDetailsProps> = ({ image, details }) => {
  const myLoader = () => {
    return image;
  };

  const displayDetailsAttribute = (key: string, type?: string) => {
    if (!details || !details[key]) return;
    if (type === 'url') {
      return (
        <Link href={details[key]} target="_blank">
          {details[key]}
        </Link>
      );
    }
    return <Paragraph style={{ margin: 0 }}>{details[key]}</Paragraph>;
  };

  return (
    <RootContainer>
      <LogoContainer>
        <Image src="/img/analytics.png" alt="Cover image" width={150} height={40}></Image>
        <Image src="/img/xertica.png" alt="Cover image" width={80} height={15}></Image>

      </LogoContainer>
      <ImageContainer>
        <Image loader={myLoader} src={'cover.jpg'} alt="Cover image" fill />
      </ImageContainer>
      <BodyContainer>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {details?.name}
        </Typography.Title>
        {displayDetailsAttribute('formatted_address')}
        {displayDetailsAttribute('website', 'url')}
      </BodyContainer>
    </RootContainer>
  );
};

export default PlaceDetailsCard;
