import {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


class SliderRange extends Component {

    render() {
        return (
            <div className="flex">
                <Range
                    marks={{
                        100: `$100`,
                        8000: `$8,000`
                    }}
                    min={100}
                    max={8000}
                    defaultValue={[500, 1000]}
                    tipFormatter={(value: any) => `$ ${value}`}
                    tipProps={{
                        placement: "top",
                        visible: true
                    }}
                />
            </div>
        );
    }
}

export default SliderRange;