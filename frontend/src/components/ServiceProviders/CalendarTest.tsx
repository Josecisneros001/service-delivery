import React, { useEffect } from 'react';
import Calendar from '../General/Calendar/Calendar';
import Slider from '../General/Slider';

const CalendarTest = () => {
    const [radius, setRadius] = React.useState(0);
    const [coord, setCoord] = React.useState({lat: 0, lng: 0});

    useEffect(() => {
        console.log(coord);
    }, [coord]);

    return (
      <div className="flex flex-col h-1/2 w-full">
          <Calendar />
      </div>
    );
}

export default CalendarTest;
