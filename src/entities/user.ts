import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Photo } from './photo';
import { Profile } from './profile';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => Profile, profile => profile.user)
    @JoinColumn({name: 'profiles'})
    profile: Profile;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];
}