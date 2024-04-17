import { Controller, Post, UseInterceptors, UploadedFile, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file) {
        return this.imageService.uploadImage(file);
    }

    @Get(':id')
    async findByFullName(@Param('id') id: number) {
      return this.imageService.getImageById(id);
    }

    @Get('test')
    async test(){
        return "Bitch"
    }
}
