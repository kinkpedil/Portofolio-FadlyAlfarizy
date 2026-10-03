import type { CSSProperties } from 'react';

type ProtectedImageProps = {
  src: string;
  alt: string;
  /** Intrinsic width / height, so the box keeps the image's shape. */
  aspectRatio: number;
  className?: string;
};

// Shows an image as a CSS background instead of an <img>, so browsers offer no "Save image",
// "Open image in new tab", drag-out or long-press save for it. This deters casual saving only:
// a screenshot or the browser's network panel can still capture anything a page displays.
export default function ProtectedImage({ src, alt, aspectRatio, className = '' }: ProtectedImageProps) {
  const style: CSSProperties = {
    aspectRatio,
    backgroundImage: `url(${src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={className}
      style={style}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    />
  );
}
