import { useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { TrashIcon } from './Icons';
import styles from './SwipeToDeleteRow.module.css';

const ACTION_WIDTH = 72;
const OPEN_THRESHOLD = ACTION_WIDTH * 0.4;
const DRAG_TOLERANCE = 4;

interface SwipeToDeleteRowProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
  children: ReactNode;
}

export function SwipeToDeleteRow({ isOpen, onOpen, onClose, onDelete, children }: SwipeToDeleteRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const liveOffset = useRef(0);
  const [, forceRender] = useState(0);

  const applyTransform = (px: number, animate: boolean) => {
    const el = contentRef.current;
    if (!el) return;
    el.style.transition = animate ? 'transform 0.2s ease-out' : 'none';
    el.style.transform = `translateX(${px}px)`;
  };

  // Keeps the rendered position in sync with `isOpen` (and re-syncs after a
  // drag ends even if `isOpen` didn't change — see the forceRender() below).
  useLayoutEffect(() => {
    if (dragging.current) return;
    applyTransform(isOpen ? -ACTION_WIDTH : 0, true);
  });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startOffset.current = isOpen ? -ACTION_WIDTH : 0;
    liveOffset.current = startOffset.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > DRAG_TOLERANCE) moved.current = true;
    liveOffset.current = Math.min(0, Math.max(-ACTION_WIDTH, startOffset.current + delta));
    applyTransform(liveOffset.current, false);
  };

  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (liveOffset.current <= -OPEN_THRESHOLD) onOpen();
    else onClose();
    // Ensures the snap-back animation still runs even when onOpen/onClose
    // doesn't change the isOpen prop (e.g. dragging back to where it started).
    forceRender((n) => n + 1);
  };

  const onContentClick = () => {
    if (moved.current) return;
    if (isOpen) onClose();
  };

  return (
    <div className={styles.root}>
      <div className={styles.trashAction} style={{ width: ACTION_WIDTH }} onClick={onDelete}>
        <TrashIcon size={20} color="#fff" />
      </div>
      <div
        ref={contentRef}
        className={styles.content}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={onContentClick}
      >
        {children}
      </div>
    </div>
  );
}
