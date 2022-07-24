export interface PostRefConfig {
  title: string
  url: string
}
export interface PostConfig {
  title: string
  fileName: string
  description: string
  category: string
  published: boolean
  publishedAt: string
  thumbnailName: string
  tags: string[]
  references?: PostRefConfig[]
  series?: {
    prevPostTitle?: string
    nextPostTitle?: string
  }
}
