import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity} from 'typeorm';
import {User} from './user';

@Entity('photos')
export class Photo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type => User, user => user.photos)
    @JoinColumn({ name: 'user_id' })
    user: User;

}