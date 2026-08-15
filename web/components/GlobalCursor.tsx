'use client';

import { Cursor, useCursorState } from 'motion-plus/react';

export function GlobalCursor() {
  const { zone } = useCursorState();

  return (
    <Cursor
      magnetic
      className="cursor"
      variants={{
        default: {
          backgroundColor:
            zone === 'overlay' ? '#333' : 'rgba(255, 255, 255, 0.1)',
        },
        pointer: {
          backgroundColor:
            zone === 'overlay' ? '#000' : 'rgba(255, 255, 255, 0.2)',
        },
      }}
      style={{
        borderRadius: 10,
        mixBlendMode: zone === 'overlay' ? 'difference' : 'normal',
      }}
    />
  );
}
