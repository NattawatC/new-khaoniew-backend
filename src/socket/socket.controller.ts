import { Controller, Get, Post } from '@nestjs/common';
import { WebSocketService } from './socket.service';

@Controller('/sockets')
export class socketController {
  constructor(private readonly webSocketService: WebSocketService) {}

  @Post('/sendDataToPython')
  sendDataToPython() {
    // Assuming you have a method in WebSocketService to send data
    this.webSocketService.sendDataToPython('Data you want to send');
    return 'Data sent to Python server';
  }
}
