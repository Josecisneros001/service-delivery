export interface SocketIoToUsers {
    [key: string]: number // socketio_Id : user_id
};
export interface UsersToSocketIo {
    [key: string]: string[] // user_id : Array<socketio_Ids>
};
