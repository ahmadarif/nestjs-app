import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { Photo } from '../entities/photo';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { PhotoService } from '../services/photo.service';

@UseInterceptors(LoggingInterceptor)
@Controller('photos')
export class PhotoController {
  constructor(
    private photoService: PhotoService,
  ){}

  @Get()
  async findAll() {
    // using Repository Pattern (via service)
    return await this.photoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    // using Active Record style
    const data = await Photo.findOne(id);
    if (!data) return { message: 'Data not found' };
    return data;
  }

  @Post()
  async create(@Body() photo: Photo) {
    return await this.photoService.create(photo);
  }
}
