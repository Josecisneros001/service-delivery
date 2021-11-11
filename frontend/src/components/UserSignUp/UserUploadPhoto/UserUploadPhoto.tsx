import { Component } from 'react';
import '../../../tailwindcss.css';
import UploadPhoto from '../UploadPhoto/UploadPhoto';
import UploadID from '../UploadID/UploadID';

class UserUploadPhoto extends Component {
    render() {
        return (
            <div className="flex flex-row h-full">
                <div className='w-1/3 bg-primaryColor' />
                <div className='flex-1 px-20'>
                    <div className="lg:text-5xl py-10 sm:text-base font-semibold tracking-wider">Welcome to <br/> Service Delivery!</div>
                    <div className="text-3xl py-10 flex-col flex items-center justify-center space-y-6">
                        <div className="font-semibold tracking-wider">Profile Picture</div>
                        <UploadPhoto/>
                        <UploadID label="Upload ID"/>
                        <UploadID label="Upload proof of address"/>
                </div>
                </div>
            </div>
        );
    }
}

export default UserUploadPhoto;