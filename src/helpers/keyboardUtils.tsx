export const onEnterKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  cb: () => void
) => {
  if (e.key === "Enter") {
    cb();
  }
};

export const generateKeyDownHandler = (cb: () => void) => {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      cb();
    }
  };
};
