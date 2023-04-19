import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Circle,
} from '@react-google-maps/api';
import { Layout, Button } from 'antd';
import { useState } from 'react';
import {
  MapContainer,
  LayoutContainer,
  SearchLayout,
  SiderContainer,
  siderStyle,
  CornerContainer,
} from './styles';
import PlaceDetailsCard from 'components/shared/DataDisplay/PlaceDetailsCard';
const { Content } = Layout;
import PlacesAutocomplete from 'components/shared/Inputs/Autocomplete';
import { DEFAULT_CENTER } from 'constants/constants';
import { getStaticStreetviewImg } from 'utils/staticStreetview';
import LayersSection from 'components/pages/Home/components/LayersSection';
import SliderSection, {
  DEFAULT_TAB,
} from 'components/pages/Home/components/SliderSection';
import CountryFlag from 'components/shared/DataDisplay/CountryFlag';
import { COUNTRIES } from 'constants/countries';

const Map = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [selected, setSelected] = useState(DEFAULT_CENTER);
  const [placeDetails, setPlaceDetails] = useState<any>();
  const [sliderType, setSliderType] = useState<string>();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ['places'],
  });

  const [circleState, setCircleState] = useState<number>();

  if (!isLoaded) {
    return <>Loading</>;
  }

  const getPlace = (placeId: string) => {
    if (!map) return;
    var request = {
      placeId: placeId,
      //fields: ['name', 'rating', 'formatted_phone_number', 'photo', 'geometry'],
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (place?.photos?.length) console.log(place.photos[0].getUrl());
      if (
        status == google.maps.places.PlacesServiceStatus.OK &&
        place?.geometry?.location
      ) {
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
        setSelected({ lat: latitude, lng: longitude, placeId });
        setPlaceDetails(place);
      }
    });
  };

  const options = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
    },
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  };

  const displayLayer = () => {
    /*const ctaLayer = new google.maps.KmlLayer({
      url: 'assets/points.kml',
      map: map,
    });
    */
    if (!map) return;
    const kmlLayer = new google.maps.KmlLayer({
      url: 'https://geekhouse.club/maps/recarga.kml',
    });
    const trafficLayer = new google.maps.TrafficLayer();
    const transitLayer = new google.maps.TransitLayer();
    const bikeLayer = new google.maps.BicyclingLayer();

    //trafficLayer.setMap(map);
    //transitLayer.setMap(map);
    kmlLayer.setMap(map);
    //bikeLayer.setMap(map);

    console.log(kmlLayer);
  };

  const handleChangeSlider = (value: number, type: string) => {
    setSliderType(type);
    if (type === 'radius') setCircleState(value);
  };

  return (
    <LayoutContainer>
      <SiderContainer style={siderStyle} width={400}>
        <PlaceDetailsCard
          image={getStaticStreetviewImg(selected.lat, selected.lng)}
          details={placeDetails}
        />
        <SliderSection onChange={handleChangeSlider} defaultTab={DEFAULT_TAB} />
        <LayersSection
          onChange={() => {
            displayLayer();
          }}
        />
      </SiderContainer>
      <Content style={{ position: 'relative' }}>
        <MapContainer>
          <SearchLayout>
            <PlacesAutocomplete
              setSelected={setSelected}
              onSelect={getPlace}
              country="pe"
            />
          </SearchLayout>
          <GoogleMap
            options={options}
            center={selected}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={setMap}
          >
            <Marker position={selected} />
            {circleState && sliderType === 'radius' && (
              <Circle center={selected} radius={circleState} />
            )}
          </GoogleMap>
          <CornerContainer>
            <CountryFlag name={COUNTRIES.pe.name} image={COUNTRIES.pe.flag} />
          </CornerContainer>
        </MapContainer>
      </Content>
    </LayoutContainer>
  );
};

export default Map;
