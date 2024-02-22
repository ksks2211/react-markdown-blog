import { useMutation, useQueryClient } from "react-query";

import {
  createPost,
  deletePostById,
  updatePost,
} from "../services/postService";
import type { PostCreateForm, PostCreatedInfo } from "@customTypes/post.types";
import { useNavigate } from "react-router-dom";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number, unknown>({
    mutationFn: deletePostById,
    onSuccess: (pid) => {
      queryClient.invalidateQueries(["post", pid]);
    },
  });
}

export function useCreatePost() {
  const navigate = useNavigate();

  return useMutation<PostCreatedInfo, Error, PostCreateForm, unknown>({
    mutationFn: (postForm) => createPost(postForm),
    // onSuccess : (data, variable, context)=>
    onSuccess: (data) => {
      navigate(`/posts/${data.id}`);
    },
  });
}

export function useUpdatePost() {
  const navigate = useNavigate();

  return useMutation<
    void,
    Error,
    { postId: number; form: PostCreateForm },
    unknown
  >({
    mutationFn: ({ postId, form }) => updatePost(postId, form),
    onSuccess: (_data, { postId }) => {
      navigate(`/posts/${postId}`);
    },
  });
}
