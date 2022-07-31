import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PostRef } from './post-ref'
import { Series } from './series'
import { Tag } from './tag'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  fileName!: string

  @Column()
  description!: string

  @Column()
  category!: string

  @Column()
  published!: boolean

  @Column({ nullable: true, default: null })
  publishedAt?: string

  @Column()
  thumbnailName!: string

  @Column()
  content!: string

  @OneToMany(() => Tag, (tag) => tag.post, { onDelete: 'CASCADE' })
  tags!: Tag[]

  @Column({ default: false })
  isCreated!: boolean

  @Column({ default: false })
  isUpdated!: boolean

  @OneToMany(() => PostRef, (postRef) => postRef.post, { onDelete: 'CASCADE' })
  references?: PostRef[]

  @ManyToOne(() => Series, { onDelete: 'CASCADE' })
  series?: Series
}
