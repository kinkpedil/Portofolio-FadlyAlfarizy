import type { CSSProperties, SyntheticEvent } from 'react';

type ProtectedImageProps = {
  src: string;
  alt: string;
  /** Intrinsic width / height, so the box keeps the image's shape. Omit when the size comes from className or style. */
  aspectRatio?: number;
  /** "contain" shows the whole image; "cover" fills the box and crops the overflow, like object-fit. */
  fit?: 'contain' | 'cover';
  /** CSS background-position, like object-position. */
  position?: string;
  className?: string;
  style?: CSSProperties;
};

/** Blocks the browser's own save paths (context menu, drag-out) on an element. */
export const blockSave = (e: SyntheticEvent) => e.preventDefault();

export const NO_SAVE_STYLE: CSSProperties = {
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  userSelect: 'none',
};

// Shows an image as a CSS background instead of an <img>, so browsers offer no "Save image",
// "Open image in new tab", drag-out or long-press save for it. This deters casual saving only:
// a screenshot or the browser's network panel can still capture anything a page displays.
export default function ProtectedImage({
  src,
  alt,
  aspectRatio,
  fit = 'contain',
  position = 'center',
  className = '',
  style,
}: ProtectedImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={className}
      style={{
        aspectRatio,
        backgroundImage: `url(${src})`,
        backgroundSize: fit,
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        ...NO_SAVE_STYLE,
        ...style,
      }}
      onContextMenu={blockSave}
      onDragStart={blockSave}
    />
  );
}
