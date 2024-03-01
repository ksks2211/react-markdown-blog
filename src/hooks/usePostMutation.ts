import { useMutation, useQueryClient } from "react-query";

import {
  createPost,
  deletePostById,
  updatePost,
} from "../services/postService";
import type {
  PostCreateForm,
  PostCreatedInfo,
  PostUpdateForm,
} from "@customTypes/post.types";
import { useNavigate } from "react-router-dom";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number, unknown>({
    mutationFn: deletePostById,
    onSuccess: (postId) => {
      queryClient.invalidateQueries(["post", postId]);
    },
  });
}

export function useCreatePost() {
  const navigate = useNavigate();

  return useMutation<PostCreatedInfo, Error, PostCreateForm, unknown>({
    mutationFn: createPost,
    // onSuccess : (data, variable, context)=>
    onSuccess: (data) => {
      setTimeout(() => navigate(`/posts/${data.id}`), 500);
    },
  });
}

export function useUpdatePost() {
  const navigate = useNavigate();

  return useMutation<void, Error, PostUpdateForm, unknown>({
    mutationFn: updatePost,
    onSuccess: (_data, { postId }) => {
      setTimeout(() => navigate(`/posts/${postId}`), 500);
    },
  });
}
