export interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
  description?: string;
}

export type PostCreateForm = Pick<
  Post,
  "title" | "content" | "description" | "tags" | "category"
>;

export type PostCreatedInfo = {
  id: number;
};

type PostPreview = Pick<
  Post,
  "id" | "title" | "createdAt" | "updatedAt" | "writer" | "description"
>;

export interface Posts {
  totalPages: number;
  postList: PostPreview[];
}

type NextPost =
  | { next: PostPreview; hasNext: true }
  | { next?: never; hasNext: false };

type PrevPost =
  | { prev: PostPreview; hasPrev: true }
  | { prev?: never; hasPrev: false };

export type PrevAndNextPosts = NextPost & PrevPost;
