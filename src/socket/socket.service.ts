import { Injectable } from '@nestjs/common';
import * as WebSocket from 'websocket';

@Injectable()
export class WebSocketService {
  private readonly client: WebSocket.client;
  private connection: WebSocket.connection | null = null; // Initialize connection as null

  constructor() {
    this.client = new WebSocket.client();

    // Connect to the WebSocket server
    this.client.connect('ws://localhost:12754', null, null, null, null);
    
    // Handle events
    this.client.on('connect', (connection: WebSocket.connection) => {
      console.log('Connected to Python WebSocket server');
      this.connection = connection; // Store the connection object
    });

    this.client.on('error', (error: Error) => {
      console.error('Connection error:', error);
    });

    this.client.on('close', () => {
      console.log('Connection closed');
    });
  }

  sendDataToPython(data: any) {
    if (this.connection) { // Check if connection is established
      this.connection.sendUTF(JSON.stringify(data));
    } else {
      console.error('Connection not established');
    }
  }
}