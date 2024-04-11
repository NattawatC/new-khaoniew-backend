import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, WsException } from '@nestjs/websockets';
import { Server } from 'ws';

@Injectable()
@WebSocketGateway({ port: 12754 })
export class WebSocketService {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message') // Use @SubscribeMessage instead of @OnMessage
  async handleIncomingMessage(socket: any, message: string): Promise<void> {
    try {
      console.log('Received message from client:', message);

      // Process the received message (e.g., parse JSON)
      const messageObject = JSON.parse(message);

      // Prepare the response message
      const response = {
        first: 'Hello from NestJS!',
        second: 'Message received successfully.',
      };
      const responseJson = JSON.stringify(response);

      // Send the response back to the client
      await socket.send(responseJson);
    } catch (error) {
      // Handle errors appropriately (e.g., log, send error message)
      console.error('Error handling incoming message:', error);
      throw new WsException('Error processing message');
    }
  }
}
