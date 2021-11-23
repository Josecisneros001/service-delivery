import React from 'react';

interface HourProps {
    label: string;
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
    render() { 
        return (
            <div 
                className={`h-10 cursor-pointer px-2 text-center ${this.state.active? 'bg-blue-100' : 'bg-white' }`}
                onClick={()=>{this.setState({active: !this.state.active})}}
            >
                {this.props.label}
            </div>
        );
    }
}

export default Hour;
