'use client';

import { X } from 'lucide-react';

import tw, { cs } from '@/styles';

import { useModel } from './model';

const MAX = 3;
const OFFSET_STEP = 10;
const EXPANDED_STEP = 88;

export default function Toasts() {
  const { handleOnClose, toasts } = useModel();

  const total = toasts.length;
  const visibleCount = Math.min(total, MAX);

  return (
    <div
      aria-atomic="true"
      aria-label="alerts & notifications"
      className={styles.container}
    >
      <ul
        className={styles.items}
        style={{
          height: `${visibleCount * EXPANDED_STEP}px`,
        }}
      >
        {toasts.map((toast, index) => {
          const stepsFromEnd = total - 1 - index;
          const isHidden = stepsFromEnd >= MAX;

          const opacity = Math.max(0, 1 - stepsFromEnd * 0.1);
          const scale = Math.max(0, 1 - stepsFromEnd * 0.1);
          const collapsedOffset = Math.max(0, stepsFromEnd * OFFSET_STEP);
          const expandedOffset = Math.max(0, stepsFromEnd * EXPANDED_STEP);

          return (
            <li
              className={
                cs(
                  styles.item,
                  isHidden ? styles.hidden : styles.visible,
                )
              }
              key={index}
              style={{
                // @ts-expect-error - is ok
                '--collapsed-y': `-${collapsedOffset}px`,
                '--expanded-y': `-${expandedOffset}px`,
                scale: isHidden ? '0' : `${scale}`,
                zIndex: index * 10,
                opacity: isHidden ? 0 : opacity,
              }}
            >
              <h3 className={styles.header}>{toast.title}</h3>
              <p className={styles.body}>{toast.body}</p>
              {(index === (total - 1)) && (
                <button
                  className={styles.close}
                  onClick={() => handleOnClose(index)}
                  type="button"
                >
                  <X className={styles.icon} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const styles = tw({
  container: `
    group
    fixed bottom-6 right-1/2 z-20000
    translate-x-1/2
    px-4
    w-full max-w-96

    sm:right-6
    sm:translate-x-0
    sm:px-0
    sm:max-w-86
  `,
  items: `
    relative
    w-full
  `,
  item: `
    absolute bottom-0 left-0
    flex flex-col gap-1
    w-full
    p-4
    border border-current/7.5
    bg-zinc-50
    text-(--foreground)
    rounded-xl
    pointer-events-auto
    translate-y-(--collapsed-y)

    motion-safe:transition-all
    motion-safe:duration-300

    dark:bg-neutral-900

    group-hover:translate-y-(--expanded-y)
  `,
  header: `
    font-medium

    sm:text-sm
  `,
  body: `
    text-current/62.5

    sm:text-sm
  `,
  visible: `
    group-hover:!scale-100
    group-hover:!opacity-100
  `,
  hidden: `
    opacity-0
    scale-0
    pointer-events-none
  `,
  close: `
    absolute top-4 right-4
  `,
  icon: `
    size-4.5
    stroke-1
  `,
});
