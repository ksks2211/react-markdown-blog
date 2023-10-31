import { useInfiniteQuery } from "react-query";
import { getPostsByCategories } from "../api";
import toInteger from "lodash-es/toInteger";
import { Posts } from "../types/post.types";
import unionBy from "lodash-es/unionBy";

export default function usePostsByCategory(categoryId: string) {
  return useInfiniteQuery<Posts, Error>(
    ["posts", categoryId],
    ({ pageParam = 1 }) =>
      getPostsByCategories(toInteger(pageParam), categoryId),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },

      select: (data) => {
        const pages = data.pages;
        const mergedPages = pages.reduce(
          (acc, page) => {
            acc.totalPages = page.totalPages;
            acc.postList = unionBy(acc.postList, page.postList, "id");
            return acc;
          },
          { totalPages: 1, postList: [] } as Posts
        );
        return { pages: [mergedPages], pageParams: data.pageParams };
      },
    }
  );
}
