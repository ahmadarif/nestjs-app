import { Injectable } from '@nestjs/common';
import { Photo } from '../entities/photo';
import { PhotoRepository } from '../repositories/photo.repository';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
  ){}

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async create(photo: Photo) {
    return await this.photoRepository.save(photo);
  }
}