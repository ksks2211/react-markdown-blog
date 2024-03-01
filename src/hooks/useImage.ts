import { useMutation, useQuery } from "react-query";
import { createImage, getImageUrl } from "../services/uploadService";
import { useUpdateUserProfileImageId } from "./useUser";
import useGlobal from "./useGlobal";
import type { ImageAddressResponse } from "@customTypes/image.types";

export function useCreateImage() {
  const mutation = useUpdateUserProfileImageId();
  const { changeProfileImageId } = useGlobal();
  return useMutation<{ id: number }, Error, File, unknown>({
    mutationFn: createImage,
    onSuccess({ id }) {
      mutation.mutate(id);
      changeProfileImageId(id);
    },
  });
}

export function useGetImageUrl({
  imageId,
  enabled,
}: {
  imageId: number;
  enabled: boolean;
}) {
  return useQuery<ImageAddressResponse, Error>(
    ["images", imageId],
    () => getImageUrl(imageId),
    {
      enabled,
    }
  );
}
