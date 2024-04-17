import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/typeorm/entities/Images';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
    ) {}

    async uploadImage(file: { originalname: string; buffer: Buffer; }) {
        const image = new Image();
        image.name = file.originalname;
        image.data = file.buffer;
        return this.imageRepository.save(image);
    }

    async getImageById(id: number): Promise<Image> {
        const image = await this.imageRepository.findOne({where: {id}});
        if (!image) {
            throw new NotFoundException('Image not found');
        }
        return image;
    }
}
