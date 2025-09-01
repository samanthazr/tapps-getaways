import { useRef, useEffect } from "react";
import { Control, Path, useController, FieldValues } from "react-hook-form";
import { Button, Box, Typography, FormLabel } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import type { LocationEntry } from '../types/getaway';

interface GooglePlaceAutocompleteProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  placeholder?: string;
}

interface CustomPlace {
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface GooglePlaceAutocompleteElement extends HTMLElement {
   place: CustomPlace | null;
  value: string;
}

//global declaration for JSX:
//eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-autocomplete': GooglePlaceAutocompleteProps;
    }
  }
}

const validateInput = (value: LocationEntry | undefined | null): boolean | string => {
  if (!value || !value.address) {
    return true;
  }

  if (/<|>/.test(value.address)) {
    return "Invalid characters are not allowed.";
  }
  return true;
};

type AddressAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  apiKey: string;
};

export function AddressAutocompleteField<T extends FieldValues>({
  name,
  control,
  label = "Getaway address",
  apiKey,
}: AddressAutocompleteFieldProps<T>) {
  const autocompleteRef = useRef<GooglePlaceAutocompleteElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const { field, fieldState: { error } } = useController({
    name,
    control,
    rules: { validate: validateInput }
  });

  useEffect(() => {
    const autocompleteElement = autocompleteRef.current;
    if (!autocompleteElement) return;

    const handlePlaceChange = (event: Event) => {
      const target = event.target as GooglePlaceAutocompleteElement;
      const place = target?.place;

      if (place?.formattedAddress && place.location) {
        field.onChange({
          address: place.formattedAddress,
          lat: place.location.lat,
          lng: place.location.lng,
        });
      }
    };
    autocompleteElement.addEventListener('gmp-placechange', handlePlaceChange);

    return () => {
      autocompleteElement.removeEventListener('gmp-placechange', handlePlaceChange);
    };
  }, [field]);

  const handleMyPositionClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    console.log("Button pressed. making position request...");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log("Relative position:", { lat, lng });

      try {
        console.log("Geocoding API call...");
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );
        const data = await res.json();
        console.log("Google Maps API complete response:", data);

        if (data.status === "OK" && data.results && data.results[0]) {
          const address = data.results[0].formatted_address;
          console.log("Address found:", address);

          field.onChange({ address, lat, lng });

          if (autocompleteRef.current) {
            autocompleteRef.current.value = address;
          }
        } else {
          //API test
          console.warn(`Maps API failed with the status: ${data.status}. Capturing relative coordinates as backup.`);
          alert(`Could not find a valid address for this location. Using relative coordinates as backup, Google API status: ${data.status}`);

          //text direction based on coordinates
          const fallbackAddress = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;

          //form's status update by data retrieved
          field.onChange({ address: fallbackAddress, lat, lng });

          //input backup relative position
          if (autocompleteRef.current) {
            autocompleteRef.current.value = fallbackAddress;
          }

          alert(`Google API access denied, try later. Retreieved coordinates as a fallback:\n${fallbackAddress}`);
        }
      } catch (error) {
        console.error("Network error calling Geocoding API:", error);
        alert("An error occurred while fetching the address.");
      }
    }, (err) => {
      console.error("Error retrieving geolocation:", err.message);
      alert("Could not get location: " + err.message);
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'}}>
      <Box sx={{ width: '85%'}}>
        <FormLabel htmlFor={name} error={!!error}>{label}</FormLabel>
        <gmp-place-autocomplete
          ref={(el: GooglePlaceAutocompleteElement | null) => {
            autocompleteRef.current = el;
            field.ref(el);
          }}
          placeholder=""
          style={{
            fontSize: '2rem',
            margin: '8px 0', padding: '2px 10px',
            border: `1px solid ${error ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)'}`, borderRadius: '4px',
          }}
        >
        </gmp-place-autocomplete>
        {error && (
          <Typography variant="caption" color="error" sx={{ ml: '0px', mt:'2px'}}>
            {error.message}
          </Typography>
        )}
      </Box>
      <Button onClick={handleMyPositionClick}
        startIcon={<GpsFixedIcon />} variant="contained" disableElevation
        sx={{
          m:'20px 0px', bgcolor: '#00E392', color: '#1A2660', fontWeight: 'bold', borderRadius: '30px', textTransform: 'none',
          ':hover': { bgcolor: '#3C1C91', color: 'white' }
        }}
      > My position </Button>
    </Box>
  );
}