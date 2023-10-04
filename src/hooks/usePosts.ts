import toInteger from "lodash-es/toInteger";
import { useQuery, useQueryClient } from "react-query";
import { getPosts } from "../api";
import { Posts } from "../types/post.types";
import unionBy from "lodash-es/unionBy";

export default function usePosts(page = 1) {
  const queryClient = useQueryClient();
  return useQuery<Posts, Error>(
    ["posts", page],
    () => getPosts(toInteger(page)),
    {
      onSuccess: (newData) => {
        const prevData = queryClient.getQueryData<Posts>("posts");
        if (!prevData) return newData;

        const totalPages = newData.totalPages;
        const mergedPosts = unionBy(newData.postList, prevData.postList, "id");

        return {
          totalPages,
          postList: mergedPosts,
        };
      },
    }
  );
}
