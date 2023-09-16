import toInteger from "lodash-es/toInteger";
import { useQuery } from "react-query";
import { getPostById } from "../api";
import { Post } from "../types/post.types";

export default function usePost(postId: number | string) {
  const pid = toInteger(postId);
  return useQuery<Post, Error>(["post", pid], () => getPostById(pid));
}
