import { useRef, useEffect } from "react";
import { useSessionStorage } from "src/utils/useSessionStorage";

export const useScrollRestoration = (pageId: string) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useSessionStorage<number>(pageId, 0);

  const positionRef = useRef(position);

  const onBeforeUnload = () => {
    setPosition(0);
  };

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const onScroll = () => {
      setPosition(scrollRef.current?.scrollTop ?? 0);
    };

    scrollRef.current.removeEventListener("scroll", onScroll);
    scrollRef.current.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollRef.current?.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    scrollRef.current!.scrollTop = positionRef.current;
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return scrollRef;
};
