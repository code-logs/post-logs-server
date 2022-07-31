import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Post } from './post'

@Entity()
export class PostRef extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  url!: string

  @ManyToOne(() => Post)
  post!: Post
}
