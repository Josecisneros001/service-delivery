import { Component } from 'react';
import '../../../tailwindcss.css';
import UploadPhoto from '../UploadPhoto/UploadPhoto'

class UserUploadPhoto extends Component {
    render() {
        return (
            <div className="flex flex-row h-full">
                <div className='w-1/3 bg-primaryColor' />
                <div className='flex-1 px-20'>
                <div className="lg:text-5xl py-16 sm:text-base">Welcome to <br/> Service Delivery!</div>
                <div className="text-3xl py-16 flex-col flex items-center justify-center space-y-9">
                    Profile Picture
                    <div></div>
                    <UploadPhoto/>
                    
                </div>
                </div>
            </div>
        );
    }
}

export default UserUploadPhoto;