import { toInteger } from "lodash";
import { useQuery } from "react-query";
import { getPostById } from "../api";

export interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
}

export default function usePost(postId: number | string) {
  const pid = toInteger(postId);
  return useQuery<Post, Error>(["post", pid], () => getPostById(pid));
}
