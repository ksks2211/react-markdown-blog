import { useQuery } from "react-query";
import { PrevAndNextPosts } from "../types/post.types";
import { getPrevAndNextPosts } from "../api";
import { toInteger } from "lodash-es";

export default function usePrevAndNextPosts(postId: string, enabled: boolean) {
  const pid = toInteger(postId);
  return useQuery<PrevAndNextPosts, Error>(
    ["prev-next-posts", pid],
    () => getPrevAndNextPosts(pid),
    {
      enabled,
    }
  );
}
