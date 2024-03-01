import { PostSearchParams } from "./../types/post.types";
import blogApi from "../api/blogApi";
import type {
  Post,
  PostCreateForm,
  PostCreatedInfo,
  PostUpdateForm,
  Posts,
  PrevAndNextPosts,
} from "@customTypes/post.types";

const POSTS_PREFIX = "/api/posts";

// Posts
export async function getPostById(postId: number) {
  const { data } = await blogApi.get(`${POSTS_PREFIX}/${postId}`);
  return data as Post;
}

export async function getPosts(page: number) {
  const query = new URLSearchParams();
  query.set("page", page.toString());
  const { data } = await blogApi.get(`${POSTS_PREFIX}?${query.toString()}`);
  return data as Posts;
}

export async function getPrevAndNextPosts(postId: number) {
  const query = new URLSearchParams();
  query.set("postId", `${postId}`);
  const { data } = await blogApi.get(
    `${POSTS_PREFIX}/prev-and-next?${query.toString()}`
  );
  return data as PrevAndNextPosts;
}

export async function deletePostById(postId: number) {
  // success : 204
  // fail : 403
  await blogApi.delete(`${POSTS_PREFIX}/${postId}`);
  return postId;
}

export async function createPost(postForm: PostCreateForm) {
  const { data } = await blogApi.post(POSTS_PREFIX, postForm);
  return data as PostCreatedInfo;
}

export async function updatePost({ postId, postForm }: PostUpdateForm) {
  await blogApi.put(`${POSTS_PREFIX}/${postId}`, postForm);
}

// Categories + Posts
export async function getPostsByCategories({
  page,
  categoryId,
}: {
  page: number;
  categoryId: string;
}) {
  const query = new URLSearchParams();
  query.set("page", page.toString());
  const { data } = await blogApi.get(
    `${POSTS_PREFIX}/categories/${categoryId}`,
    {
      params: query,
    }
  );

  return data as Posts;
}

export async function getPostsBySearchParams({
  page,
  postSearchParams,
}: {
  page: number;
  postSearchParams: PostSearchParams;
}) {
  const query = new URLSearchParams();
  query.set("page", page.toString());
  if (postSearchParams.writer) {
    query.set("writer", postSearchParams.writer);
  }
  if (postSearchParams.allTags) {
    query.set("allTags", postSearchParams.allTags.toString());
  }
  postSearchParams.tags.forEach((tag) => query.append("tags", tag));

  const { data } = await blogApi.get(`${POSTS_PREFIX}/search`, {
    params: query,
  });
  return data as Posts;
}
