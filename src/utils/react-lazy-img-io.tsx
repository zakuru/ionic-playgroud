import React, { useEffect, useRef, FunctionComponent, HTMLProps } from 'react';


const observersCache = new Map<string, IntersectionObserver>();

interface ObserverOptions {
  root?: string;
  rootMargin?: string;
  threshold?: number | number[];
}

function observerOptionsToInit(options: ObserverOptions): IntersectionObserverInit {
  const { root, rootMargin, threshold } = options;
  return {
    root: root ? document.querySelector(root) : undefined,
    rootMargin,
    threshold,
  };
}

/**
 * Returns an IntersectionObserver that loads the image
 * when it is at least {threshold}*100 visible in the viewport.
 *
 * PS: Cached on the window for performance
 */
function getImageLoaderObserver(
  ioOptions: ObserverOptions = {},
): IntersectionObserver {
  const { threshold = 0 } = ioOptions;

  // cache key is dependent of io args
  const CACHE_KEY = `__LAZY_IMAGE_IO_${JSON.stringify(ioOptions)}`;

  // return the cached observer for performance
  let cachedObserver = observersCache.get(CACHE_KEY);
  if (cachedObserver !== undefined) {
    return cachedObserver;
  }

  // create a new observer and cache it on the window
  cachedObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            if (!img.hasAttribute('src') || dataSrc !== img.getAttribute('src')) {
              img.setAttribute('src', dataSrc);
            }
          }
          observer.unobserve(img);
        }
      });
    },
    observerOptionsToInit({
      ...ioOptions,
      threshold,
    })
  );

  observersCache.set(CACHE_KEY, cachedObserver);
  return cachedObserver;
}

export interface LazyImageProps extends HTMLProps<HTMLImageElement> {
  className?: string;
  initialSrc?: string;
  src: string;
  alt?: string;
  errorSrc?: string;
  ioOptions?: ObserverOptions;
  onError?: () => void;
  onClick?: (e: any) => void;
}

const LazyImage: FunctionComponent<LazyImageProps> = ({
  className,
  initialSrc,
  src,
  alt,
  ioOptions = {},
  errorSrc,
  onError,
  onClick,
  style,
}: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleError = () => {
    // manually attach fallback src to img on Error
    if (imgRef.current && errorSrc) {
      imgRef.current.src = errorSrc;
      onError && onError();
    }
  };

  useEffect(() => {
    const observer = getImageLoaderObserver(ioOptions);
    const target = imgRef.current;
    if (observer && target) {
      observer.observe(target);
    }
    return () => {
      if (observer && target) {
        observer.unobserve(target);
      }
    };
  }, [src, ioOptions]);

  return (
    <img
      className={className}
      src={initialSrc}
      data-src={src}
      ref={imgRef}
      onError={handleError}
      alt={alt}
      onClick={onClick}
      style={style}
    />
  );
};

export default LazyImage;