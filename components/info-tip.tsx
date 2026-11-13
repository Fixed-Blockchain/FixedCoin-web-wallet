'use client';

import { CircleHelp } from 'lucide-react';
import {
  useCallback,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type InfoTipProps = {
  children: ReactNode;
  label: string;
};

type TooltipPosition = {
  left: number;
  top: number;
  width: number;
};

const TOOLTIP_MAX_WIDTH = 288;
const TOOLTIP_VIEWPORT_MARGIN = 16;
const TOOLTIP_GAP = 8;

export function InfoTip({ children, label }: InfoTipProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({
    left: TOOLTIP_VIEWPORT_MARGIN,
    top: TOOLTIP_VIEWPORT_MARGIN,
    width: TOOLTIP_MAX_WIDTH,
  });
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const pointerFocusRef = useRef(false);
  const pinnedRef = useRef(false);
  const tooltipId = useId();

  const closeTooltip = useCallback(() => {
    pinnedRef.current = false;
    setOpen(false);
  }, []);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const width = Math.min(
      TOOLTIP_MAX_WIDTH,
      Math.max(0, viewportWidth - TOOLTIP_VIEWPORT_MARGIN * 2),
    );
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipHeight = tooltip.getBoundingClientRect().height;
    const centeredLeft = triggerRect.left + triggerRect.width / 2 - width / 2;
    const maxLeft = Math.max(
      TOOLTIP_VIEWPORT_MARGIN,
      viewportWidth - TOOLTIP_VIEWPORT_MARGIN - width,
    );
    const left = Math.min(
      Math.max(centeredLeft, TOOLTIP_VIEWPORT_MARGIN),
      maxLeft,
    );
    const below = triggerRect.bottom + TOOLTIP_GAP;
    const above = triggerRect.top - TOOLTIP_GAP - tooltipHeight;
    const top =
      below + tooltipHeight > viewportHeight - TOOLTIP_VIEWPORT_MARGIN &&
      above >= TOOLTIP_VIEWPORT_MARGIN
        ? above
        : Math.min(
            below,
            Math.max(
              TOOLTIP_VIEWPORT_MARGIN,
              viewportHeight - TOOLTIP_VIEWPORT_MARGIN - tooltipHeight,
            ),
          );

    setPosition({ left, top, width });
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        closeTooltip();
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTooltip();
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [closeTooltip, open]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const animationFrame = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition]);

  return (
    <span
      ref={rootRef}
      className="group/info relative inline-flex shrink-0"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType === 'mouse' &&
          !pinnedRef.current &&
          !rootRef.current?.contains(document.activeElement)
        ) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        aria-label={label}
        className="grid size-11 place-items-center rounded-lg border border-[#6b9ab4]/28 bg-[#0b141d] text-[#9aabb7] outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-[#46bfd1]/52 hover:bg-[#46bfd1]/10 hover:text-[#8fe6f2] focus-visible:border-[#f2c95c]/60 focus-visible:ring-4 focus-visible:ring-[#f2c95c]/15"
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget)) closeTooltip();
        }}
        onClick={() => {
          pinnedRef.current = !pinnedRef.current;
          setOpen(pinnedRef.current);
          pointerFocusRef.current = false;
        }}
        onFocus={() => {
          if (!pointerFocusRef.current) setOpen(true);
        }}
        onPointerDown={() => {
          pointerFocusRef.current = true;
        }}
      >
        <CircleHelp className="size-4" aria-hidden="true" />
      </button>
      <span
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        aria-hidden={!open}
        className={`fixed z-50 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border border-[#46bfd1]/28 bg-[#0b141d]/98 p-3 text-left text-xs font-medium leading-5 text-[#c5d0d8] shadow-[0_24px_70px_rgba(0,0,0,0.52),inset_3px_0_0_rgba(70,191,209,0.34)] backdrop-blur-xl transition-opacity duration-150 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        style={position}
      >
        {children}
      </span>
    </span>
  );
}
