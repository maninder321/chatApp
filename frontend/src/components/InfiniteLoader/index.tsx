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
  const observer = useRef<IntersectionObserver>();
  const loaderRef = useCallback((node: any) => {
    observer.current = new IntersectionObserver(
      (entry: IntersectionObserverEntry[]) => {
        if (entry[0].isIntersecting) {
          loadDataCallback();
        }
      }
    );
    if (node) {
      observer.current.observe(node);
    }
  }, []);

  return hasMore ? (
    <div ref={loaderRef} className={`${styles.infiniteLoaderWrapper}`}>
      <SpinnerLoader size={size} color={color} />
    </div>
  ) : (
    <></>
  );
}

export default InfiniteLoader;
