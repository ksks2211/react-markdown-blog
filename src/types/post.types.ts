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
