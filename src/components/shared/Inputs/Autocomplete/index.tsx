import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Input } from 'antd';
import { AutocompleteInput } from './styles';

const PlacesAutocomplete = ({ setSelected, onSelect, country }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country } },
    debounce: 300,
  });

  const handleSelect = async (place_id: any) => {
    const place = data.find((el) => el.place_id === place_id);
    const address = place?.description;
    if (!address) return;
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address: place.description });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    onSelect && onSelect(place.place_id);
  };

  return (
    <>
      <AutocompleteInput
        onSelect={handleSelect}
        value={value}
        onChange={(e: any) => {
          setValue(e);
        }}
        options={data.map((place) => {
          return { label: <>{place.description}</>, value: place.place_id };
        })}
      >
        <Input.Search size="large" placeholder="Buscar" />
      </AutocompleteInput>
    </>
  );
};

export default PlacesAutocomplete;
