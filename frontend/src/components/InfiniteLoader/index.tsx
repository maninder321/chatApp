import React, { useCallback, useEffect, useRef } from "react";
import styles from "./css/infiniteloader.module.css";
import SpinnerLoader from "../SpinnerLoader";

interface InfiniteLoaderProps {
  hasMore: boolean;
  loadDataCallback: Function;
  size?: string;
  color?: string;
}

function InfiniteLoader({
  hasMore = false,
  size = "10x",
  color = "black",
  loadDataCallback,
}: InfiniteLoaderProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          loadDataCallback();
        }
      }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.current.observe(currentLoaderRef);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadDataCallback]);

  return hasMore ? (
    <div ref={loaderRef} className={`${styles.infiniteLoaderWrapper}`}>
      <SpinnerLoader size={size} color={color} />
    </div>
  ) : (
    <></>
  );
}

export default InfiniteLoader;
