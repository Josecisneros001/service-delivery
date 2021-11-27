import React from 'react';
import { AvailabilityDay, defaultAvailabilityDay, hours, hoursN } from '../../../interfaces/AvailabilityModel';
import Hour from './Hour';

interface DayProps {
    index: number;
    label: string;
    availability: AvailabilityDay;
    reserved?: AvailabilityDay;
    onChange: Function;
    onChangeReserved?: Function;
    reservedBehavior?: boolean
}

interface DayState {
    availability: AvailabilityDay;
    reserved: AvailabilityDay;
}

class Day extends React.Component<DayProps, DayState,{}> {
    constructor(props: DayProps) {
        super(props);
        this.state = {
            availability: defaultAvailabilityDay(),
            reserved:  defaultAvailabilityDay()
        }
    }

    componentDidUpdate(prevProps: DayProps) {
        if(prevProps.availability !== this.props.availability) {
            this.setState({availability: this.props.availability});
        }
        if(prevProps.reserved !== this.props.reserved) {
            this.setState({reserved: this.props.reserved || defaultAvailabilityDay()});
        }
    }

    handleChange = (index:number, newValue: boolean) => {
        const currentAvailability = this.state.availability;
        currentAvailability[hoursN[index]] = newValue;
        this.setState({availability: currentAvailability});
        this.props.onChange(this.props.index, currentAvailability);
    }

    handleChangeReserved = (index:number, newValue: boolean) => {
        const currentAvailability = this.state.reserved;
        currentAvailability[hoursN[index]] = newValue;
        this.setState({reserved: currentAvailability});
        if (this.props.onChangeReserved) {
            this.props.onChangeReserved(this.props.index, currentAvailability);
        }
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
                                reservedBehavior={this.props.reservedBehavior}
                                isReserved={this.props.reserved?.[hoursN[index]] || false}
                                isAvailable={this.props.availability[hoursN[index]]}
                                onChange={this.handleChange}
                                onChangeReserved={this.handleChangeReserved}
                            />
                })}
            </div>
        );
    }
}

export default Day;
