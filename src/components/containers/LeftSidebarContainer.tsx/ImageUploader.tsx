import { useRef, useState } from "react";
import useGlobal from "../../../hooks/useGlobal";
import { useCreateImage } from "../../../hooks/useImage";

export default function ImageUploader() {
  const { profileImageId } = useGlobal();

  const [imageSrc, setImageSrc] = useState<string | undefined>(
    profileImageId === -1 ? undefined : `/${profileImageId}`
  );

  const imageRef = useRef<HTMLInputElement>(null);

  const mutation = useCreateImage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (files[0]) {
      const file = files[0];
      setImageSrc(URL.createObjectURL(file));
      mutation.mutate(file);
    }
  };

  const onClick = () => {
    if (imageRef) {
      imageRef.current?.click();
    }
  };

  return (
    <div onClick={onClick}>
      <img src={imageSrc} alt="Image" />
      <input
        ref={imageRef}
        type="file"
        id="image"
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
}
