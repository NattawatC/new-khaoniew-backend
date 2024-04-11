import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // Correct import
import * as chokidar from 'chokidar'; // Import chokidar for file watching
import { writeFile } from 'fs/promises'; // Importing fs.promises for asynchronous file operations
import { readFile } from 'fs/promises';
import { resolve } from 'path';

@WebSocketGateway({ maxHttpBufferSize: 1024 * 1024 * 1024 })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('Socket server initialized');
        const something = '/tmp/kntmpIn'
        this.watchDirectory(something)
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client ${client.id} connected`); // Fix backticks for string interpolation
    }

    handleDisconnect(client: Socket) {
        console.log(`Client ${client.id} disconnected`); // Fix backticks for string interpolation
    }

    @SubscribeMessage('binaryData')
    async handleBinaryData(client: Socket, data: Uint8Array) {
        console.log(`Binary data received from client ${client.id}:`, data);
        try {
            const filePath = `/tmp/kntmpOut/1.bin`
            await writeFile(filePath, Buffer.from(data));
            console.log('Binary data saved to:', filePath);
            // console.log(aiData)
            // return filePath;
        } catch (error) {
            console.error('Error handling incoming message:', error);
            throw new WsException('Error processing message');
        }
        return "hello"
    }

    // @SubscribeMessage('binaryData') // Listen for the 'binaryData' event
    // sentJsonBack(data: Uint8Array) {
    //     console.log(`Binary data received from client ${client.id}:`, data);
    //     return 'Binary data received successfully'; // Acknowledge the message
    // }

    private async watchDirectory(directoryPath: string) {
        const watcher = chokidar.watch(directoryPath, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true
        });

        watcher
            .on('change', async path => {
                console.log(`File ${path} has been changed`);
                try {
                    const fileContent = await readFile(path, 'utf-8');
                    console.log(`File content: ${fileContent}`);
                    const jsonFile = JSON.parse(fileContent)
                    this.server.emit('fileChanged', { path, content: jsonFile });
                } catch (error) {
                    console.error(`Error reading file ${path}: ${error}`);
                }
            })
        watcher.on('error', error => console.error(`Watcher error: ${error}`));
    }
}
