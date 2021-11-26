import React, { MouseEvent } from 'react';
import "./Hour.css"

interface HourProps {
    label: string;
    isAvailable: boolean;
    index: number;
    onChange: Function;
}

interface HourState {
    active: boolean;
}

class Hour extends React.Component<HourProps, HourState,{}> {
    constructor(props: HourProps) {
        super(props);
        this.state = {
            active: false,
        }
    }

    componentDidUpdate = (prevProps: HourProps) => {
        if (prevProps.isAvailable !== this.props.isAvailable) {
            this.setState({active: this.props.isAvailable});
        }
    }

    mouseAction = (e: MouseEvent<HTMLDivElement>) => {
        if (e.buttons === 1) {
            this.props.onChange(this.props.index, !this.state.active);
            this.setState({active: !this.state.active});
        }
    }

    render() {
        return (
            <div 
                className={`noselect cursor-pointer px-2 py-1.5 text-center ${this.state.active? 'bg-blue-100' : 'bg-white' }`}
                onMouseDown={this.mouseAction}
                onMouseOver={this.mouseAction}
            >
                {this.props.label}
            </div>
        );
    }
}

export default Hour;
