import React from 'react';

interface MessageProps {
    isFromCurrentUser: boolean;
    message: string;
    timestamp: Date;
}

interface MessageState {
}

class Message extends React.Component<MessageProps, MessageState,{}> {
    render() { 
        return (
            <div className={`w-full flex ${this.props.isFromCurrentUser? 'justify-end' : 'justify-start'}`}>
                <div className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative" style={{maxWidth: "350px"}}>
                    <span className="block">{this.props.message}</span>
                    <span className="block text-xs text-right">{this.props.timestamp.getHours() + ":" + this.props.timestamp.getMinutes()}</span>
                </div>
            </div>
        );
    }
}

export default Message;
