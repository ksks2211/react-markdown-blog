import blogApi from "../api/blogApi";
import type { PostCreateForm } from "@customTypes/post.types";

const urlPrefix = "/api/posts";

// Posts
export async function getPostById(postId: number) {
  const { data } = await blogApi.get(`${urlPrefix}/${postId}`);
  return data;
}

export async function getPosts(page: number) {
  const query = new URLSearchParams();
  query.set("page", page.toString());
  const { data } = await blogApi.get(`${urlPrefix}?${query.toString()}`);
  return data;
}

export async function getPrevAndNextPosts(postId: number) {
  const query = new URLSearchParams();
  query.set("postId", `${postId}`);
  const { data } = await blogApi.get(
    `${urlPrefix}/prev-and-next?${query.toString()}`
  );
  return data;
}

export async function deletePostById(postId: number) {
  // success : 204
  // fail : 403
  await blogApi.delete(`${urlPrefix}/${postId}`);
  return postId;
}

export async function createPost(postForm: PostCreateForm) {
  const { data } = await blogApi.post(urlPrefix, postForm);

  return data;
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
  const { data } = await blogApi.get(`${urlPrefix}/categories/${categoryId}`, {
    params: query,
  });

  return data;
}
