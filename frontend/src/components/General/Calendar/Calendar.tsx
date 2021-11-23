import React from 'react';
import Day from './Day';

interface CalendarProps {
}

interface CalendarState {
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Calendar extends React.Component<CalendarProps, CalendarState,{}> {

    render() { 
        return (
            <div className="flex flex-row w-1/2">
                {days.map((day) => {
                    return <Day label={day} />
                })}
            </div>
        );
    }
}

export default Calendar;
