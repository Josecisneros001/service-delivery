import React, { ChangeEvent, Component, createRef} from 'react';
import "../../../tailwindcss.css";
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import UploadID from '../UploadID/UploadID';

class UserUploadPhoto extends Component {
    private form = createRef<HTMLFormElement>();
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: ChangeEvent<any>) {
        event.preventDefault()
        const data = new FormData(this.form.current as HTMLFormElement)
        fetch('/api/v1/users/files/4', { method: 'POST', body: data })
          .then(res => res.json())
      }

    render() {
        return (
            <div className="flex flex-row min-h-full">
                <div className='w-1/3 bg-primaryColor min-h-full' />
                <div className='flex-1 px-20'>
                    <div className="text-center lg:text-5xl py-10 sm:text-base font-semibold tracking-wider">Welcome to <br/> Service Delivery!</div>
                    <div className="text-3xl flex-col flex items-center justify-center">
                        <form className="flex items-center justify-center space-y-2 flex-col"ref={this.form} onSubmit={this.handleSubmit}>
                            <div className="font-semibold tracking-wider">Profile Picture</div>
                            <UploadPhoto/>
                            <div className="pt-12 pb-5">
                                <UploadID label="Upload ID" id="upload-id" name="file_id"/>
                                <br/>
                                <UploadID label="Upload proof of address" id="upload-address" name="file_proof_of_address"/>
                            </div>
                            <button type="submit" className="button button1">Confirm</button>
                        </form>
                </div>
                </div>
            </div>
        );
    }
}

export default UserUploadPhoto;