import blogApi from "../api/blogApi";

// Posts
export async function getPostById(postId: number) {
  const { data } = await blogApi.get(`/posts/${postId}`);
  return data;
}

export async function getPosts(page: number) {
  const query = new URLSearchParams();
  query.set("page", page.toString());
  const { data } = await blogApi.get(`/posts?${query.toString()}`);
  return data;
}

export async function getPrevAndNextPosts(postId: number) {
  const query = new URLSearchParams();
  query.set("postId", `${postId}`);
  const { data } = await blogApi.get(
    `/posts/prev-and-next?${query.toString()}`
  );
  return data;
}

export async function deletePostById(postId: number) {
  // success : 204
  // fail : 403
  await blogApi.delete(`/posts/${postId}`);
  return postId;
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
  const { data } = await blogApi.get(`/posts/categories/${categoryId}`, {
    params: query,
  });

  return data;
}
