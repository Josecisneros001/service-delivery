import React, { ChangeEvent, Component, createRef} from 'react';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import UploadID from '../UploadID/UploadID';
import { Users } from '../../../scripts/APIs/Users';
import Snackbar from '../../General/Snackbar';
import { Navigate } from 'react-router';
import { getCurrentUser } from '../../../scripts/APIs';

declare interface State {
    photo: string;
    file_id: string;
    file_proof_of_address:string;
    showAlert: boolean;
    snackBarMsg: string;
    isDone: boolean;
}

class UploadFilesForm extends Component<{is_service_provider: boolean}, State> {
    private form = createRef<HTMLFormElement>();
    constructor(props: {is_service_provider: boolean}) {
        super(props);
        this.state = {
            photo: "",
            file_id: "",
            file_proof_of_address: "",
            showAlert: false,
            snackBarMsg: "",
            isDone: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    configSnackbar = {
        verticalAlign: ['bottom', 'top'][0],
        horizontalAlign: ['center', 'left', 'right'][2],
        closeButton: true,
        infinite: false,
        timeout: 5000,
    };

    hideSnackbar = () => {
        this.setState({showAlert: false});
    };

    async handleSubmit(event: ChangeEvent<any>) {
        event.preventDefault();
        const data = new FormData(this.form.current as HTMLFormElement);
        if (!this.state.photo || !this.state.file_id || !this.state.file_proof_of_address) {
            this.setState({snackBarMsg: `Missing File`, showAlert: true});
            return false;
        }
        const response = await Users.files(data, getCurrentUser(this.props.is_service_provider));
        if(response.status !== 200) {
            this.setState({snackBarMsg: `Server Error - Try again later`, showAlert: true});
            this.setState({showAlert: true});
            return;
        }
        this.setState({isDone: true});
    }

    handlePhoto = (fileName: string) => {
        this.setState({photo: fileName});
    }

    handleFileId = (fileName: string) => {
        this.setState({file_id: fileName});
    }

    handleFileProofOfAddress = (fileName: string) => {
        this.setState({file_proof_of_address: fileName});
    }

    render() {
        if (this.state.isDone) {
            if (this.props.is_service_provider) {
                return <Navigate to="/service-providers/" />
            } else {
                return <Navigate to="/users/" />
            }
        }
        return (
            <>
                <Snackbar {...this.configSnackbar} show={this.state.showAlert} hideEvent={this.hideSnackbar} message={this.state.snackBarMsg} />
                <div className="flex flex-row min-h-full">
                    <div className='w-1/3 bg-primaryColor min-h-full' />
                    <div className='flex-1 px-20'>
                        <div className="text-center lg:text-5xl py-10 sm:text-base font-semibold tracking-wider">Welcome to <br/> Service Delivery!</div>
                        <div className="text-3xl flex-col flex items-center justify-center">
                            <form className="flex items-center justify-center space-y-2 flex-col" ref={this.form} onSubmit={this.handleSubmit}>
                                <div className="font-semibold tracking-wider">Profile Picture</div>
                                <UploadPhoto onChange={this.handlePhoto} />
                                <div className="pt-12 pb-5">
                                    <UploadID label="Upload ID" id="upload-id" name="file_id" onChange={this.handleFileId} />
                                    <br/>
                                    <UploadID label="Upload proof of address" id="upload-address" name="file_proof_of_address" onChange={this.handleFileProofOfAddress} />
                                </div>
                                <button type="submit" className="button button1">Confirm</button>
                            </form>
                    </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UploadFilesForm;