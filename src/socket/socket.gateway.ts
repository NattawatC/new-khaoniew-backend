import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('Socket server initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client ${client.id} connected`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client ${client.id} disconnected`);
    }

    @SubscribeMessage('binaryData') // Listen for the 'binaryData' event
    handleBinaryData(client: Socket, data: Uint8Array) {
        console.log(`Binary data received from client ${client.id}:`, data);
        return 'Binary data received successfully'; // Acknowledge the message
    }
}
