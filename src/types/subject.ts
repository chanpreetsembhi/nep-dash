export type Docs = {
  _id: string
  title: string
  url: string
}

export type Topic = {
  _id: string
  topic: string
  url: string
  category: string
}

export type Subject = {
  _id: string
  subject: string
  document: Topic
}
