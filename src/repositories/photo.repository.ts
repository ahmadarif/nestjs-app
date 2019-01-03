import { EntityRepository, Repository } from 'typeorm';
import { Photo } from '../entities/photo';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {}