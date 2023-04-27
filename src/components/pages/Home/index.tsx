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
import { getStaticStreetviewImg } from 'utils/staticStreetview';
import LayersSection from 'components/pages/Home/components/LayersSection';
import SliderSection, {
  DEFAULT_TAB,
} from 'components/pages/Home/components/SliderSection';
import CountryFlag from 'components/shared/DataDisplay/CountryFlag';
import { COUNTRIES } from 'constants/countries';

const Map = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [selected, setSelected] = useState(COUNTRIES['co'].center);
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

  const displayLayer = (key: string, layers: string[]) => {
    if (!map) return;

    layers.map((layer) => {
      if (layer === 'trafficLayer') {
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      }
      if (layer === 'populationLayer') {
        let origin = location.origin;

        const kmlLayer = new google.maps.KmlLayer({
          url: origin + '/assets/Bogota.kml',
        });
        kmlLayer.setMap(map);
      }
      
    });

    const transitLayer = new google.maps.TransitLayer();
    const bikeLayer = new google.maps.BicyclingLayer();

    //transitLayer.setMap(map);
    //bikeLayer.setMap(map);

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
          onChange={(key, layers) => {
            displayLayer(key, layers);
          }}
        />
      </SiderContainer>
      <Content style={{ position: 'relative' }}>
        <MapContainer>
          <SearchLayout>
            <PlacesAutocomplete
              setSelected={setSelected}
              onSelect={getPlace}
              country={COUNTRIES['co'].code}
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
            <CountryFlag
              name={COUNTRIES['co'].name}
              image={COUNTRIES['co'].flag}
            />
          </CornerContainer>
        </MapContainer>
      </Content>
    </LayoutContainer>
  );
};

export default Map;
