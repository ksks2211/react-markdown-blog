import { useQuery } from "react-query";
import { Categories } from "../types/post.types";
import { getCategories } from "../api";

export default function useCategories() {
  return useQuery<Categories, Error>("categories", () => getCategories());
}
