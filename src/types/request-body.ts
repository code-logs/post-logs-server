export interface NewTagParam {
  id?: string
  name: string
}
export interface NewPostRefParam {
  title: string
  url: string
}

export interface NewSeriesParam {
  prevPostTitle?: string
  nextPostTitle?: string
}
export interface NewPostParam {
  title: string
  category: string
  description: string
  fileName: string
  tags: NewTagParam[]
  references: NewPostRefParam[]
  series: NewSeriesParam
  published?: boolean
  publishedAt?: string
}
