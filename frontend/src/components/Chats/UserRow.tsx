import React from 'react';
import { ChatMessages as ChatMessagesModel } from '../../interfaces/models/ChatMessages';
import { Users as UsersModel } from '../../interfaces/models/Users';
import { getFileUrl } from '../../scripts/APIs';

interface UsersRowProps {
    onClick: Function;
    user: UsersModel;
    lastMessage?: ChatMessagesModel;
}

interface UsersRowState {
}

class UsersRow extends React.Component<UsersRowProps, UsersRowState,{}> {

    getDeltaTime() {
        if (!this.props.lastMessage) {
            return '';
        }
        const now = new Date();
        const messageTimesamp = new Date(this.props.lastMessage.registered_on + 'Z');
        const diffMs = (now.getTime() - messageTimesamp.getTime());
        const diffDays = Math.floor(diffMs / 86400000);
        const diffHrs = Math.floor((diffMs) / 3600000);
        const diffMins = Math.round(((diffMs)) / 60000);
        
        if (diffMins < 60) {
            if (diffMins === 1){
                return `${diffMins} Minute`;
            }
            return `${diffMins} Minutes`;
        }

        if (diffHrs < 24) {
            if (diffHrs === 1){
                return `${diffHrs} Hour`;
            }
            return `${diffHrs} Hours`;
        }

        if (diffDays === 1){
            return `${diffDays} Day`;
        }
        return `${diffDays} Days`;
    }

    render() { 
        return (
            <div className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                onClick={()=>this.props.onClick(this.props.user, this.props.lastMessage)}
            >
                <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={getFileUrl(this.props.user.profile_picture)}
                    alt="a"
                />
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-base text-gray-600 ">{this.props.user.first_name} {this.props.user.last_name}</span>
                        <span className="block ml-2 text-sm text-gray-600">{this.getDeltaTime()}</span>
                    </div>
                    <span className="flex flex-row ml-2 text-sm text-gray-600">
                        {this.props.lastMessage?.message || ''}
                        {this.props.lastMessage?.attachment_url?
                            <svg className="text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            : <></>
                        }
                    </span>
                </div>
            </div>
        );
    }
}

export default UsersRow;
