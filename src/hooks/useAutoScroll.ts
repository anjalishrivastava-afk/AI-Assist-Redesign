import { useRef, useState, useCallback, useEffect } from 'react';

export function useAutoScroll(contentKey: unknown) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
    setHasScrolledUp(false);
  }, []);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setHasScrolledUp(distanceFromBottom > 80);
  }, []);

  useEffect(() => {
    if (!hasScrolledUp) {
      requestAnimationFrame(() => scrollToBottom(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);

  return { containerRef, bottomRef, hasScrolledUp, scrollToBottom, handleScroll };
}
