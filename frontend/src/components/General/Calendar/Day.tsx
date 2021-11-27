import React from 'react';
import { AvailabilityDay, defaultAvailabilityDay, hours, hoursN } from '../../../interfaces/AvailabilityModel';
import Hour from './Hour';

interface DayProps {
    index: number;
    label: string;
    availability: AvailabilityDay;
    onChange: Function;
}

interface DayState {
    availability: AvailabilityDay;
}

class Day extends React.Component<DayProps, DayState,{}> {
    constructor(props: DayProps) {
        super(props);
        this.state = {
            availability: defaultAvailabilityDay()
        }
    }

    componentDidUpdate(prevProps: DayProps) {
        if(prevProps.availability !== this.props.availability) {
            this.setState({availability: this.props.availability});
        }
    }

    handleChange = (index:number, newValue: boolean) => {
        const currentAvailability = this.state.availability;
        currentAvailability[hoursN[index]] = newValue;
        this.setState({availability: currentAvailability});
        this.props.onChange(this.props.index, currentAvailability);
    }

    render() { 
        return (
            <div className="flex-1 flex flex-col my-2 border">
                <h1 className="pb-2 border-b">{this.props.label}</h1>
                {hours.map((hour, index) => {
                    return <Hour 
                                key={index}
                                index={index}
                                label={hour}
                                isAvailable={this.props.availability[hoursN[index]]}
                                onChange={this.handleChange}
                            />
                })}
            </div>
        );
    }
}

export default Day;
