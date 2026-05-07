import { useEffect, useState } from "react";

export default function Avatar({
  src,
  alt = "",
  fallback = "A",
  className = "",
  imgClassName = "",
  children,
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#0d2818,#cfeac9)] font-black text-white ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{fallback}</span>
      )}
      {children}
    </div>
  );
}
