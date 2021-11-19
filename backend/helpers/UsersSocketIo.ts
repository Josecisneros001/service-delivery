import type { SocketIoToUsers, UsersToSocketIo } from "../interfaces/UsersOnline";

export class UsersSocketIo {
  static instance : UsersSocketIo;
  private socketIoDict: SocketIoToUsers;
  private usersDict: UsersToSocketIo;

  /**
   * Constructor
  */
  constructor() {
    this.socketIoDict = {};
    this.usersDict = {};
  }

  /**
   * Function that return SocketIoUsers instance.
  */
  static getInstance() : UsersSocketIo {
    if (!UsersSocketIo.instance) {
      UsersSocketIo.instance = new UsersSocketIo();
    }
    return UsersSocketIo.instance;
  }

  /**
   * Function that handle connection.
  */
  addConnection(user_id: number, socketId: string) {
    this.socketIoDict[socketId] = user_id;
    if (!this.usersDict[user_id]) {
      this.usersDict[user_id] = [];
    }
    this.usersDict[user_id].push(socketId);
  }

  /**
   * Function that handle disconnect.
  */
  removeConnection(user_id: number, socketId: string) {
    delete this.socketIoDict[socketId];
    if (!this.usersDict[user_id]) {
      this.usersDict[user_id] = [];
    }
    const indexSocket = this.usersDict[user_id].indexOf(socketId);
    if (indexSocket > -1) {
      this.usersDict[user_id].splice(indexSocket, 1);
    }
    if (this.usersDict[user_id].length == 0) {
      delete this.usersDict[user_id];
    }
  }

  /**
   * Function that returns user accoding to socket.
  */
  getUser(socketId: string) {
    return this.socketIoDict[socketId];
  }

  /**
   * Function that returns sockets accoding to user.
  */
  getSockets(user_id: number) {
    if (!this.usersDict[user_id]) {
      return [];
    }
    return this.usersDict[user_id];
  }
}
