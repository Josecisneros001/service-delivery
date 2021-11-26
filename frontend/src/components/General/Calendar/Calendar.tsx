import React from 'react';
import { AvailabilityDay, AvailabilityModel, days, daysN, defaultAvailability } from '../../../interfaces/AvailabilityModel';
import Day from './Day';

interface CalendarProps {
    availability: AvailabilityModel
    onChange: Function
}

interface CalendarState {
    availability: AvailabilityModel
}

class Calendar extends React.Component<CalendarProps, CalendarState,{}> {
    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            availability: defaultAvailability()
        }
    }

    componentDidUpdate(prevProps: CalendarProps) {
        if(prevProps.availability !== this.props.availability) {
            this.setState({availability: this.props.availability});
        }
    }

    handleChange = (index: number, day: AvailabilityDay) => {
        const currentAvailability = this.state.availability;
        currentAvailability[daysN[index]] = day;
        this.setState({availability: currentAvailability});
        this.props.onChange(currentAvailability);
    }

    render() { 
        return (
            <div className="flex flex-row">
                {days.map((day, index) => {
                    return <Day
                                index={index}
                                key={index}
                                label={day}
                                availability={this.props.availability[daysN[index]]}
                                onChange={this.handleChange}
                            />
                })}
            </div>
        );
    }
}

export default Calendar;
