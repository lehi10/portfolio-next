import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Circle,
} from '@react-google-maps/api';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
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
import { COMISARIAS_DATA } from 'constants/constants';
import { CustomMarkerInterface } from 'interfaces/customMarker';
import { LatLng } from 'use-places-autocomplete';

const Map = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [selected, setSelected] = useState(COUNTRIES['co'].center);
  const [placeDetails, setPlaceDetails] = useState<any>();
  const [sliderType, setSliderType] = useState<string>();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ['places'],
  });

  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isochrone, setIsochrone] = useState<google.maps.Polygon>();


  const [circleState, setCircleState] = useState<number>();

  useEffect(()=>{
    if(isochrone && map){
      isochrone.setMap(map);
    }
  }, [isochrone]);

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

  const clearMarkers = () => {
    // Eliminar todos los marcadores
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    // Vaciar el array de marcadores
    setMarkers([]);
  };

  const clearIsochrone = () => {
    isochrone?.setMap(null);
    setIsochrone(undefined);
  };

  const displayMarkes = (markersArray: CustomMarkerInterface[]) => {
    clearMarkers();
    let currentPlaces = markersArray;
   if(isochrone){
    if(google?.maps?.geometry?.poly){      
      const filteredPlaces = markersArray.filter((place: CustomMarkerInterface)=>{
        const LatLng = {lat:place.latitud, lng: place.longitud};
        const belong = google.maps.geometry.poly.containsLocation(LatLng, isochrone);
        return belong;
      });
      currentPlaces = filteredPlaces;
    }
   }
   const currentMarkers = currentPlaces.map(
    (place) => 
      new google.maps.Marker(
        {
          position: {lat: place.latitud,lng: place.longitud}, 
          map,
          icon: {
            url: 'http://maps.google.com/mapfiles/kml/shapes/cabs.png',
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          }
        }
      ));
   setMarkers(currentMarkers);
  };

  const displayLayer = (key: string, layers: string[]) => {
    if (!map) return;
    clearMarkers();
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
      if(layer==='policeStation'){
        //fetchMarkers('comisarias');
        const data = COMISARIAS_DATA
        displayMarkes(data);
      }
    });
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
        <SliderSection 
          onChange={handleChangeSlider} 
          defaultTab={DEFAULT_TAB} 
          map={map} 
          selected={selected} 
          onGetIsochron={(isoc)=>{
            clearIsochrone();
            setIsochrone(isoc);
          }}
        />
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
