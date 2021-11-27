import React, { MouseEvent } from 'react';
import "./Hour.css"

interface HourProps {
    label: string;
    reservedBehavior?: boolean;
    isAvailable: boolean;
    isReserved: boolean;
    index: number;
    onChange: Function;
    onChangeReserved?: Function;
}

interface HourState {
    active: boolean;
    reserved: boolean;
}

class Hour extends React.Component<HourProps, HourState,{}> {
    constructor(props: HourProps) {
        super(props);
        this.state = {
            active: false,
            reserved: false,
        }
    }

    componentDidUpdate = (prevProps: HourProps) => {
        if (prevProps.isAvailable !== this.props.isAvailable) {
            this.setState({active: this.props.isAvailable});
        }
        if (prevProps.isReserved !== this.props.isReserved) {
            this.setState({reserved: this.props.isReserved});
        }
    }

    mouseAction = (e: MouseEvent<HTMLDivElement>) => {
        if (this.props.reservedBehavior && !(this.props.isAvailable) ) {
            return;
        }
        if (e.buttons === 1) {
            if (this.props.reservedBehavior && this.props.onChangeReserved) {
                this.props.onChangeReserved(this.props.index, !this.state.reserved);
                this.setState({reserved: !this.state.reserved});
            } else {
                this.props.onChange(this.props.index, !this.state.active);
                this.setState({active: !this.state.active});
            }
        }
    }

    getBackgroundColor = () => {
        if (this.state.reserved) {
            return 'bg-blue-300';
        }
        if (this.state.active) {
            return 'bg-blue-100';
        }
        return 'bg-white';
    }

    render() {
        return (
            <div 
                className={`noselect cursor-pointer px-2 py-1.5 text-center ${this.getBackgroundColor()}`}
                onMouseDown={this.mouseAction}
                onMouseOver={this.mouseAction}
            >
                {this.props.label}
            </div>
        );
    }
}

export default Hour;
