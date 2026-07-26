"use client";

import { useEffect, useRef, type RefObject } from "react";

type Target = RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[];

/**
 * USE CASE: Close a dropdown / modal when the user clicks outside it.
 *
 * HOW TO USE:
 *   const ref = useRef<HTMLDivElement>(null)
 *   const [open, setOpen] = useState(false)
 *
 *   useClickOutside(ref, () => setOpen(false), open)
 *
 *   {open && <div ref={ref}>Menu</div>}
 *
 * You can pass multiple refs: useClickOutside([menuRef, buttonRef], ...)
 */
export function useClickOutside(
  target: Target,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true,
): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;

    const refs = Array.isArray(target) ? target : [target];

    const onEvent = (event: MouseEvent | TouchEvent) => {
      const node = event.target;
      if (!(node instanceof Node)) return;

      const clickedInside = refs.some((ref) => {
        const el = ref.current;
        return el != null && el.contains(node);
      });

      if (!clickedInside) handlerRef.current(event);
    };

    document.addEventListener("mousedown", onEvent);
    document.addEventListener("touchstart", onEvent, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onEvent);
      document.removeEventListener("touchstart", onEvent);
    };
  }, [target, enabled]);
}
