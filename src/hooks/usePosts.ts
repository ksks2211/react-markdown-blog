import { toInteger } from "lodash";
import { useQuery } from "react-query";
import { Post } from "./usePost";
import { getPosts } from "../api";

type PostPreview = Pick<
  Post,
  "id" | "title" | "createdAt" | "updatedAt" | "writer"
>;

interface Posts {
  totalPages: number;
  postList: PostPreview[];
}

export default function usePosts(page = 1) {
  return useQuery<Posts, Error>("posts", () => getPosts(toInteger(page)));
}
