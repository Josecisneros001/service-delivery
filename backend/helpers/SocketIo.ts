import http from 'http';
import { Socket } from 'socket.io';
import { UsersSocketIo } from './UsersSocketIo';
import { Server } from 'socket.io';

export class SocketIo {
  static instance : SocketIo;
  private usersSocketIo : UsersSocketIo;
  private io : Server;

  /**
   * Constructor
  */
  constructor(httpServer: http.Server) {
    this.usersSocketIo = UsersSocketIo.getInstance();
    this.io = new Server(httpServer, {
      cors: { origin: "*" }
    });
    this.initialize();
  }

  /**
   * Function that return SocketIo instance.
  */
  static getInstance(httpServer: http.Server) : SocketIo {
    if (!SocketIo.instance) {
      SocketIo.instance = new SocketIo(httpServer);
    }
    return SocketIo.instance;
  }
  
  /**
   * Function that initialize socketIo instance.
  */
  initialize() {
    this.io.on('connection', (socket: Socket) => {
        const user_id = socket.handshake.query['user_id'] as string;
        this.usersSocketIo.addConnection(parseInt(user_id), socket.id);
        console.log(`${user_id} has connected`);
        
        socket.on('message', (receiver: number) => {
          console.log(`${user_id} send a message to ${receiver}`);
          const usersockets = this.usersSocketIo.getSockets(receiver);
          for (const usersocket of usersockets) {
            this.io.to(usersocket).emit('message', user_id);
          }
        });
      
        socket.on('disconnect', async () => {
          this.usersSocketIo.removeConnection(parseInt(user_id), socket.id);
          console.log(`${user_id} disconnected`);
        });
    });
  }
}
