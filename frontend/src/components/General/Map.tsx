import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

interface MapProps {
    fixedCenter?: {lat: number, lng: number}
    radius?: number;
    onCenterChange?: Function;
}

const containerStyle = {
    width: '100%',
    height: '100%',
};
  
const center = {
    lat: 25.6714,
    lng: -100.309
};

const options = {
  mapTypeControl: false,
  fullscreenControl: false,
  panControl : false,
  streetViewControl: false,
  zoomControlOptions: {
    position: 1
  }
}

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_KEY || '';

function Map(props: MapProps) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: MAP_API_KEY,
    });
  
    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const [coord, setCoord] = React.useState(center);
    const [radius, setRadius] = React.useState(0);
    
    const onLoad = React.useCallback(function callback(map) {
      setMap(map);
      if(props.onCenterChange && !props.fixedCenter){
        props.onCenterChange(center);
      }
    }, [props])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    useEffect(() => {
      if (map) {
        setRadius((props?.radius || 0));
        if(props?.fixedCenter) {
          setCoord(props?.fixedCenter);
        }
      }
    }, [props, map]);

    const onCenterChanged = () => {
      if (map && !props.fixedCenter) {
        const mapCenter = map.getCenter();
        const lat = mapCenter?.lat() || center.lat;
        const lng = mapCenter?.lng() || center.lng;
        setCoord({lat: lat, lng: lng});
        if(props.onCenterChange){
          props.onCenterChange({lat: lat, lng: lng})
        }
      }
    };

    const renderIndicator = () => {
      if (radius && radius > 0) {
        return <Circle center={coord} radius={radius} />
      }

      return <Marker position={coord} />
    };

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={options}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onCenterChanged={onCenterChanged}
        >
          {renderIndicator()}
        </GoogleMap>
    ) : <div> Map Loading ... </div>;
}

export default React.memo(Map);
