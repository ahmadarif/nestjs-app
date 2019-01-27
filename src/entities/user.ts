import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo';
import { Profile } from './profile';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Profile, profile => profile.user)
    @JoinColumn({ name: 'profile_id' })
    profile_id: number;

    @Column({ collation: 'utf8mb4_bin'})
    name: string;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];
}
