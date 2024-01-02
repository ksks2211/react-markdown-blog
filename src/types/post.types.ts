export interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
  description: string;
}

type PostPreview = Pick<
  Post,
  "id" | "title" | "createdAt" | "updatedAt" | "writer" | "description"
>;

export interface Posts {
  totalPages: number;
  postList: PostPreview[];
}

type PostPreviewExistence =
  | { next: PostPreview; hasNext: true }
  | { next?: never; hasNext: false };
type PostPrevExistence =
  | { prev: PostPreview; hasPrev: true }
  | { prev?: never; hasPrev: false };

export type PrevAndNextPosts = PostPreviewExistence & PostPrevExistence;
