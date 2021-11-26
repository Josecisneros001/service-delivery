import React, { Component } from "react";
import UsersNavbar from "../Users/UsersNavbar";
import ServiceProviderNavbar from "../ServiceProviders/ServiceProviderNavbar";
import Snackbar from "../General/Snackbar";
import SearchUsers from "./SearchUsers";
import UsersRow from "./UserRow";
import Message from "./Message";
import { Users as UsersModel } from "../../interfaces/models/Users";
import { ChatMessages as ChatMessagesModel } from "../../interfaces/models/ChatMessages";
import { ChatMessages } from "../../scripts/APIs/ChatMessages";
import { BACK_AVAILABLE, BACK_HOST_NAME, getCurrentUser, getFileUrl } from "../../scripts/APIs";
import { Users } from "../../scripts/APIs/Users";
import { io, Socket } from "socket.io-client";

interface ChatsState {
	message: string;
	fileName: string;
	showAlert: boolean;
	snackBarMsg: string;
	activeChat?: {
		user: UsersModel;
		messages: ChatMessagesModel[];
	} | null | undefined;
	activeChats: {
		user: UsersModel;
		lastMessage: ChatMessagesModel;
	}[];
}

interface ActiveChatsTmp {
	id: number;
	user_sender_id: number;
	user_receiver_id: number;
	message: string;
	attachment_url: string;
	registered_on: string;
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	profile_picture: string;
}

interface ServerToClientEvents {
	message: (sender: string) => void;
}
  
interface ClientToServerEvents {
	message: (receiver: number) => void;
}

class Chats extends Component<{is_service_provider: boolean, location?: any},ChatsState,{}> {
	private refMessageForm: React.RefObject<HTMLFormElement>;
	private refChatTool: React.RefObject<HTMLInputElement>;
	private fileInputRef: React.RefObject<HTMLInputElement>;
	private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  	constructor(props: {is_service_provider: boolean, location?: any}) {
		super(props);
		this.state = {
			message: '',
			fileName: '',
			showAlert: false,
			snackBarMsg: '',
			activeChat: null,
			activeChats: [] as ChatsState["activeChats"],
		};
		this.refChatTool = React.createRef();
		this.fileInputRef = React.createRef();
		this.refMessageForm = React.createRef();
  	}

  	configSnackbar = {
		verticalAlign: ['bottom', 'top'][0],
		horizontalAlign: ['center', 'left', 'right'][2],
		closeButton: true,
		infinite: false,
		timeout: 5000,
  	};

	componentDidUpdate() {
		const node = this.refChatTool.current as HTMLElement;
		if (node) {
			node.scrollTop = node.scrollHeight;
		}
	}
	
	async componentDidMount() {
		const response = await ChatMessages.get(true, getCurrentUser(this.props.is_service_provider));
		if(response.status !== 200) {
            this.setState({snackBarMsg: 'Something wrong happen, please try again.', showAlert: true});
            return;
        }
		if (response.data) {
			const data = response.data as ActiveChatsTmp[];
			this.setState({
				activeChats: data.map((activeChat) => {
					return {
						user: {
							id: activeChat.user_id,
							first_name: activeChat.first_name,
							last_name: activeChat.last_name,
							email: activeChat.email,
							profile_picture: activeChat.profile_picture
						},
						lastMessage: {
							id: activeChat.id,
							user_receiver_id: activeChat.user_receiver_id,
							user_sender_id: activeChat.user_sender_id,
							message: activeChat.message,
							attachment_url: activeChat.attachment_url,
							registered_on: activeChat.registered_on
						},
					}
				}).sort((a, b) => ( (a.lastMessage?.registered_on || '') < (b.lastMessage?.registered_on  || '') ) ? 1 : -1),
			});
		}
		if (BACK_AVAILABLE) {
			this.socket = io(BACK_HOST_NAME, {query: {
				"user_id": getCurrentUser(this.props.is_service_provider)
			}});
			this.socket.on("message", async (user_id: string) => {
				const responseChat = await ChatMessages.get(null, getCurrentUser(this.props.is_service_provider), parseInt(user_id));
				if(responseChat.status !== 200) {
					return;
				}
				let lastMessage = null;
				if (responseChat.data && responseChat.data.length > 0) {
					lastMessage = responseChat.data[responseChat.data.length - 1];
				}
				await this.updateActiveChats(parseInt(user_id), lastMessage);
				if (parseInt(user_id) === this.state.activeChat?.user.id) {
					this.openConversation(this.state.activeChat.user);
				}
			});
		}
		const query = new URLSearchParams(window.location.search);
		if(query.get("user_id")) {
			const usr_id = parseInt(query.get("user_id") || '');
			const usr = await Users.getById(usr_id);
			if (usr.status === 200) {
				this.openConversation(usr.data);
			}
		}
		
	}


	handleMessage = (messageValue: string) => {
		this.setState({message: messageValue});
	}

	handleFileName = (fileNameValue: string) => {
		this.setState({fileName: fileNameValue});
	}

	formValidations = () => {
		if (!this.state.message && !this.state.fileName) {
			this.setState({snackBarMsg: "Missing Content", showAlert: true});
			return false;
		}
		return true;
	}

	handleSubmit = async (event: React.ChangeEvent<any>) => {
		event.preventDefault();
		if(!this.formValidations()){
			return;
		}
		const data = new FormData(this.refMessageForm.current as HTMLFormElement);
		const response = await ChatMessages.create(getCurrentUser(this.props.is_service_provider), this.state.activeChat?.user.id || -1, data);
		if(response.status !== 200) {
		  this.setState({snackBarMsg: 'Server Error, please try again.', showAlert: true});
		  return;
		}
		let lastMessage = response.data as ChatMessagesModel;
		if (!lastMessage) {
			this.setState({snackBarMsg: 'Server Error, please try again.', showAlert: true});
			return;
		}
		lastMessage.registered_on = lastMessage.registered_on?.slice(0, -1) || new Date().toISOString().slice(0, -1);
		lastMessage.user_receiver_id = parseInt(lastMessage.user_receiver_id?.toString() || '0');
		lastMessage.user_sender_id = parseInt(lastMessage.user_sender_id?.toString() || '0');
		const activeChat = this.state.activeChat;
		if(!activeChat) {
			this.setState({snackBarMsg: 'Unknown Error, close your browser and try again.', showAlert: true});
			return;
		}
		this.setState({
			activeChat: {
				user: activeChat.user,
				messages: [...activeChat.messages, lastMessage]
			},
			message: "",
			fileName: "",
		});
		this.refMessageForm.current?.reset();
		this.updateActiveChats(this.state.activeChat?.user.id || -1, lastMessage);
		if (BACK_AVAILABLE) {
			this.socket?.emit("message", this.state.activeChat?.user.id || 0)
		}
	}

	hideSnackbar = () => {
		this.setState({showAlert: false});
	};

	userFound = async (user: UsersModel) => {
		for (const activeChat of this.state.activeChats) {
			if (activeChat.user.id === user.id) {
				this.openConversation(user);
				return;
			}
		}
		const response = await ChatMessages.get(null, getCurrentUser(this.props.is_service_provider), user?.id || 0);
        if(response.status !== 200) {
            this.setState({snackBarMsg: 'Something wrong happen, please try again.', showAlert: true});
            return;
        }
		let lastMessage = null;
		if (response.data && response.data.length > 0) {
			lastMessage = response.data[response.data.length - 1];
		}
		this.setState({
			activeChats: [
				{
					user: user,
					lastMessage: lastMessage
				}, ...this.state.activeChats
			]
		});
		this.openConversation(user);
	}

	updateActiveChats = async (user_id: number, lastMessage: ChatMessagesModel) => {
		let found = false;
		let activeChats = this.state.activeChats;
		for (const activeChat of activeChats) {
			if (activeChat.user.id === user_id) {
				activeChat.lastMessage = lastMessage;
				found = true;
				break;
			}
		}
		if (!found) {
			activeChats = [
				{
					user: (await Users.getById(user_id)).data,
					lastMessage: lastMessage
				}, ...this.state.activeChats
			]
		}
		activeChats.sort((a, b) => ( (a.lastMessage?.registered_on || '') < (b.lastMessage?.registered_on  || '') ) ? 1 : -1)
		this.setState({activeChats: activeChats});
	}

	openConversation = async (user: UsersModel) => {
		const response = await ChatMessages.get(null, getCurrentUser(this.props.is_service_provider), user?.id || 0);
        if(response.status !== 200) {
            this.setState({snackBarMsg: 'Something wrong happen, please try again.', showAlert: true});
            return;
        }
		this.setState({
			activeChat: {
				user: user,
				messages: response.data
			}
		});
	}

	chatRender = () => {
		if (!this.state.activeChat) {
			return (
				<div className="w-full">
					<div id="chat" className="w-full overflow-y-auto p-10 relative" style={{height:"800px"}} ref={this.refChatTool}>
					</div>
				</div>
			);
		}
		const activeUser = this.state.activeChat.user;
		return (
			<div className="w-full">
				<div className="flex items-center border-b border-gray-300 pl-3 py-3">
					<img className="h-10 w-10 rounded-full object-cover"
					src={getFileUrl(activeUser.profile_picture)}
					alt="avatar" />
					<span className="block ml-2 font-bold text-base text-gray-600">{`${activeUser.first_name} ${activeUser.last_name}`}</span>
				</div>
				<div id="chat" className="w-full overflow-y-auto p-10 relative" style={{height:"700px"}} ref={this.refChatTool}>
					<ul>
						<li className="clearfix2">
							{this.state.activeChat.messages.map((message)=>{
								return (
									<Message
										key={message.id}
										message={message.message || ''}
										file={getFileUrl(message.attachment_url)}
										timestamp={new Date(message.registered_on + 'Z')}
										isFromCurrentUser={message.user_sender_id === getCurrentUser(this.props.is_service_provider)}
									/>
								);
							})}
						</li>
					</ul>
				</div>

				<form className="controllers w-full py-3 px-3 flex flex-row items-center justify-between border-t border-gray-300"
					onSubmit={this.handleSubmit}
					ref={this.refMessageForm}
				>
					<button
						onClick={(event) => {
							event.preventDefault();
							this.fileInputRef.current?.click();
						}}
						className="outline-none focus:outline-none ml-1"
					>
						<div className="relative">
							<svg className="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
							</svg>
							{this.state.fileName 
							? 	<span className="absolute top-0 right-0 connected text-red-500" >
									<svg width="10" height="10">
										<circle cx="4" cy="4" r="4" fill="currentColor"></circle>
									</svg>
								</span>
							: <></>}
						</div>
					</button>

					<input
						type="file"
						style={{display: "none"}}
						ref={this.fileInputRef}
						name="attachment"
						onChange={(event) => {
							const file = event.target.files![0];
							if (file) {
								this.setState({fileName: file.name});
							} else {
								this.setState({fileName: ""});
							}
						}}
					/>

					<input
						type="text"
						placeholder="Aa"
						className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
						name="message"
						autoComplete="off"
						onChange={(event) => {
							this.setState({message: event.target.value});
						}}
					/>

					<button className="outline-none focus:outline-none" type="submit">
						<svg className="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
						</svg>
					</button>
				</form>
			</div>
		);
	}

	render() {
		return (
			<div className="flex flex-col max-h-full">
				<Snackbar {...this.configSnackbar} show={this.state.showAlert} hideEvent={this.hideSnackbar} message={this.state.snackBarMsg} />
				{
				this.props.is_service_provider
				? <ServiceProviderNavbar className="flex-none" />
				: <UsersNavbar className="flex-none" />
				}
				<div className="grid grid-cols-3 min-w-full border rounded flex-1">
					<div className="col-span-1 bg-white border-r border-gray-300 flex flex-col">
						<div className="my-3 mx-3 flex-none">
							<SearchUsers onChange={this.userFound} />
						</div>
						<h2 className="ml-2 mb-2 text-gray-600 text-lg my-2 flex-none">Chats</h2>
						<div className="overflow-auto" style={{maxHeight: "720px"}}>
							{this.state.activeChats?.map((chat, index)=> {
								return <UsersRow onClick={this.openConversation} user={chat.user} lastMessage={chat.lastMessage}  key={index} />;
							})}
						</div>
					</div>
					<div className="col-span-2 bg-white max-h-full">
						{this.chatRender()}
					</div>
				</div>
			</div>
		);
	}
}

export default Chats;
