import React from 'react';

interface Button {
  label?: string;
  closeOnClick?: boolean;
  show: boolean;
}

interface Props {
  message: string,
  verticalAlign?: string,
  horizontalAlign?: string,
  closeButton?: boolean,
  closeLabel?: string,
  customButton?: Button,
  show?: boolean,
  infinite?: boolean,
  timeout?: number,
  hideEvent: Function;
  buttonEvent?: Function;
}


class Snackbar extends React.Component<Props,{},{}> {
  static defaultProps = {
    message: "",
    verticalAlign: ['bottom', 'top'][0],
    horizontalAlign: ['center', 'left', 'right'][0],
    closeButton: true,
    closeLabel: 'Cerrar',
    customButton: {
      label: '',
      closeOnClick: false,
      show: false,
    },
    show: true,
    infinite: true,
    timeout: 5000,
  }

  private refSnackbar:  React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.refSnackbar = React.createRef();
  }

  componentDidUpdate() {
    if (!this.props.show) {
      return;
    }
    this.show_();
    if (!this.props.infinite && this.props.timeout) {
      setTimeout(() => {
        this.hide_();
      }, this.props.timeout);
    }
  }

  transitionDefault = (() => {
    let transitionDefault = '';
    if (this.props.verticalAlign === 'top') {
      transitionDefault += 'translate3D(0, calc((100%) * -1), 0)';
    }
    if (this.props.verticalAlign === 'bottom') {
      transitionDefault += 'translate3D(0, calc((100%)), 0)';
    }
    return transitionDefault;
  });

  transitionHide = () => {
    const node = this.refSnackbar.current as HTMLElement;
    if (!node) {
      return;
    }
    if (this.props.verticalAlign === 'bottom') {
      node.style.transform = 'translate3D(0, calc(100%), 0)';
    } else {
      node.style.transform = 'translate3D(0, calc((100%) * -1), 0)';
    }
  };

  buttonEvent = () => {
    if (this.props.buttonEvent) {
      this.props.buttonEvent();
    }
    if (this.props.customButton && this.props.customButton.closeOnClick) {
      this.hide_();
    }
  };

  snackbarPosition = (() => {
    let snackbarPosition = '';
    if (this.props.horizontalAlign === 'center') {
      snackbarPosition += 'inset-x-0 ';
    }
    if (this.props.horizontalAlign === 'left') {
      snackbarPosition += 'left-0 ';
    }
    if (this.props.horizontalAlign === 'right') {
      snackbarPosition += 'right-0 ';
    }
    if (this.props.verticalAlign === 'top') {
      snackbarPosition += 'top-0  ';
    }
    if (this.props.verticalAlign === 'bottom') {
      snackbarPosition += 'bottom-0 ';
    }
    return snackbarPosition;
  });

  show_ = () => {
    setTimeout(() => {
      this.transitionShow();
    }, 150);
  };
  
  transitionShow = () => {
    const node = this.refSnackbar.current as HTMLElement;
    if (this.props.verticalAlign === 'bottom') {
      node.style.transform = 'translate3D(0, 0, 0)';
    } else {
      node.style.transform = 'translate3D(0, 0, 0)';
    }
  };

  hide_ = () => {
    this.transitionHide();
    setTimeout(() => {
      this.props.hideEvent();
    }, 150);
  };
  
  render() { 
      return (
        <div
          ref={this.refSnackbar}
          className={`snackbar shadow min-w-72 max-w-144 min-h-12 max-h-40 py-3 px-6 flex items-center fixed z-20 rounded transition-transform mx-auto bg-gray-800 text-white text-sm sm:text-base ${this.snackbarPosition()}`}
          style={{transform: this.transitionDefault()}}
        >
          <div
            className="content flex items-center justify-between flex-grow transition-opacity"
          >
            <span className="mr-4">
              { this.props.message }
            </span>
            <button
              className="ml-auto bg-transparent border border-white focus:outline-none cursor-pointer hover:bg-white hover:bg-opacity-20 py-1.5 px-3 rounded"
              onClick={()=>this.buttonEvent()}
              style={{display: this.props.customButton?.show ? "block" : "none"}}
            >
              { this.props.customButton?.label }
            </button>
            <button
              className="ml-2 bg-transparent border border-white focus:outline-none cursor-pointer hover:bg-white hover:bg-opacity-20 py-1.5 px-3 rounded"
              onClick={()=>this.hide_()}
              style={{display: this.props.closeButton ? "block" : "none"}}
            >
              { this.props.closeLabel }
            </button>
          </div>
        </div>      
      );
  }
}

export default Snackbar;