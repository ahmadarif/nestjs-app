import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Photo } from './photo';
import { Profile } from './profile';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    // @OneToOne(type => Profile, profile => profile.user)
    // @JoinColumn({ name: 'profile_id' })
    @Column()
    profile_id: number;
    
    @Column()
    name: string;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

    @OneToOne(type => Profile, profile => profile.user, { persistence: false })
    profile: Profile;
}