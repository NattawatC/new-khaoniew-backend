import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket as server1} from 'socket.io';

@WebSocketGateway({maxHttpBufferSize: 1024 * 1024 * 1024})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('Socket server initialized');
    }

    handleConnection(client: server1, ...args: any[]) {
        console.log(`Client ${client.id} connected`);
    }

    handleDisconnect(client: server1) {
        console.log(`Client ${client.id} disconnected`);
    }

    @SubscribeMessage('binaryData') // Listen for the 'binaryData' event
    handleBinaryData(client: server1, data: Uint8Array) {
        console.log(`Binary data received from client ${client.id}:`, data);
        return 'Binary data received successfully'; // Acknowledge the message
    }

    


}
