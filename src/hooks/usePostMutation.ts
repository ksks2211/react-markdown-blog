import { useMutation, useQueryClient } from "react-query";

import { createPost, deletePostById } from "../services/postService";
import { PostCreateForm, PostCreatedInfo } from "../types/post.types";
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
