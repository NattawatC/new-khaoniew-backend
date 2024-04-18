import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Response } from 'express';
import { log } from 'console';

@Controller('images')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file) {
        return this.imageService.uploadImage(file);
    }

    // @Get(':id')
    // async getImageByIg(@Param('id') id: number) {
    //   return this.imageService.getImageById(id);
    // }

    @Get(':id')
    async getImageByIg(@Param('id') id: number, @Res() res: Response) {
      const imageData = await this.imageService.getImageById(id);
      if (!imageData) {
        res.status(404).send('Image not found');
        return;
      }
  
      // Set the Content-Type header based on the image type (e.g., 'image/png')
      res.setHeader('Content-Type', 'image/png'); // Adjust as needed
  
      console.log(imageData)
      // Send the image data as the response
      res.send(imageData);
    }
}
