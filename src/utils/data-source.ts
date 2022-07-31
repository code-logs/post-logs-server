import 'reflect-metadata'
import { DataSource } from 'typeorm'
import entities from '../entities'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'sqlite.db',
  logging: true,
  entities,
  synchronize: true,
})
