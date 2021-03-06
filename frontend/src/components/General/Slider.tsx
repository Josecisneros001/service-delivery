import React from 'react';
import "./Slider.css"

interface SliderProps {
    initialValue?: number,
    minRange: number,
    maxRange: number,
    onChange: Function,
}

class Slider extends React.Component<SliderProps,{ value: number },{}> {
    constructor(props: SliderProps) {
        super(props);
        this.state = {
            value: props.initialValue || 0,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps: SliderProps) {
        if(this.props.initialValue !== prevProps.initialValue) {
            this.setState({value: this.props.initialValue || 0});
        }
    }

    handleChange(event: React.ChangeEvent<any>) {
        this.setState({value: parseInt(event.target.value)});
        this.props.onChange(parseInt(event.target.value));
    }

    render() { 
        return (
            <div className="slidecontainer w-full h-8">
                <input
                    className="slider"
                    type="range"
                    min={this.props.minRange}
                    max={this.props.maxRange}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Slider;
