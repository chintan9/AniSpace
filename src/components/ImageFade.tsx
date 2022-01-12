import { FC, HTMLProps, useState } from "react";

const ImageFade: FC<HTMLProps<HTMLImageElement>> = ({
  className,
  crossOrigin: _,
  onLoad,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...others}
      className={`${className} ${
        loaded ? "opacity-100" : "opacity-0"
      } transition duration-300`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
    />
  );
};

export default ImageFade;
