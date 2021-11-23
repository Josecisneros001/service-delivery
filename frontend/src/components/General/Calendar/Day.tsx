import React from 'react';
import Hour from './Hour';

interface DayProps {
    label: string;
}

interface DayState {
}

const hours = ["06:00", "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

class Day extends React.Component<DayProps, DayState,{}> {
    render() { 
        return (
            <div className="flex-1 flex flex-col py-2 border">
                <h1 className="mb-2 border-b">{this.props.label}</h1>
                {hours.map((hour) => {
                    return <Hour label={hour} />
                })}
            </div>
        );
    }
}

export default Day;
