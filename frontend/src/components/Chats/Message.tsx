import React from 'react';

interface MessageProps {
    isFromCurrentUser: boolean;
    message: string;
    file?: string;
    timestamp: Date;
}

interface MessageState {
}

class Message extends React.Component<MessageProps, MessageState,{}> {
    prettyDate2 = ((date: Date) => {
        return date.toLocaleTimeString(navigator.language, {
          hour: '2-digit',
          minute:'2-digit'
        });
    });

    render() { 
        return (
            <div className={`w-full flex ${this.props.isFromCurrentUser? 'justify-end' : 'justify-start'}`}>
                <div
                    className={`${this.props.isFromCurrentUser? 'bg-blue-100' : 'bg-gray-100'} rounded px-5 py-2 my-2 text-gray-700 relative`}
                    style={{maxWidth: "350px"}}
                >
                    <span className="block">{this.props.message}</span>
                    {this.props.file?
                        <a className="flex flex-row underline my-0.5" href={this.props.file}>
                            Attachment
                            <svg className="text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </a>
                        : <></>
                    }
                    <span className="block text-xs text-right">{this.prettyDate2(this.props.timestamp)}</span>
                </div>
            </div>
        );
    }
}

export default Message;
