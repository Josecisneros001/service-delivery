import React, { useEffect } from 'react';
import Map from '../General/Map';
import Slider from '../General/Slider';

const MapTest = () => {
    const [radius, setRadius] = React.useState(0);
    const [coord, setCoord] = React.useState({lat: 0, lng: 0});

    useEffect(() => {
        console.log(coord);
    }, [coord]);

    return (
      <div className="flex flex-col h-1/2 w-1/2">
            <Map radius={radius} onCenterChange={setCoord} />
            <Slider minRange={0} maxRange={10000} onChange={setRadius} />
      </div>
    );
}

export default MapTest;
