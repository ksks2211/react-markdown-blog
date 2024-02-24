import type { PostSearchParams } from "./../types/post.types";
import { toInteger, unionBy } from "lodash-es";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import {
  getPostById,
  getPosts,
  getPostsByCategories,
  getPostsBySearchParams,
  getPrevAndNextPosts,
} from "../services/postService";
import type { Post, Posts, PrevAndNextPosts } from "@customTypes/post.types";
import qs from "qs";
import { useMemo } from "react";

export function useGetPost({ postId }: { postId: number | string }) {
  const pid = toInteger(postId);

  return useQuery<Post, Error>(["post", pid], () => getPostById(pid));
}

export function useGetPostList({ page = 1 }: { page?: number } = {}) {
  const queryClient = useQueryClient();
  return useQuery<Posts, Error>(
    ["posts", page],
    () => getPosts(toInteger(page)),
    {
      onSuccess: (newData) => {
        const prevData = queryClient.getQueryData<Posts>(["posts", page]);
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

export function useGetPostListByCategory({
  categoryId,
}: {
  categoryId: string;
}) {
  return useInfiniteQuery<Posts, Error>(
    ["posts", categoryId],
    ({ pageParam = 1 }) =>
      getPostsByCategories({ page: toInteger(pageParam), categoryId }),
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

export function useGetPostListBySearchQuery({
  postSearchParams,
}: {
  postSearchParams: PostSearchParams;
}) {
  const { tags, writer, allTags } = postSearchParams;

  const queryKey = useMemo(() => {
    const queryString = qs.stringify(
      { tags: tags.sort(), writer, allTags },
      { arrayFormat: "brackets" }
    );
    return ["postsSearch", queryString];
  }, [tags, allTags, writer]);

  return useInfiniteQuery<Posts, Error>(
    queryKey,
    ({ pageParam = 1 }) =>
      getPostsBySearchParams({ page: toInteger(pageParam), postSearchParams }),
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

export function usePrevAndNextPosts({
  postId,
  enabled,
}: {
  postId: string | number;
  enabled: boolean;
}) {
  const pid = toInteger(postId);
  return useQuery<PrevAndNextPosts, Error>(
    ["prev-next-posts", pid],
    () => getPrevAndNextPosts(pid),
    {
      enabled,
    }
  );
}
