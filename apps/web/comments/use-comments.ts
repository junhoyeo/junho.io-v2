import getXPath from 'get-xpath';
import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { createEditor, type BaseEditor } from 'slate';
import { ReactEditor, withReact } from 'slate-react';

import { positionDraftAtom } from '@/state/comments';

export const useComments = (): {
  editor: BaseEditor & ReactEditor;
  onReset: () => void;
} => {
  // eslint-disable-next-line react/hook-use-state
  const [editor] = useState(() => withReact(createEditor()));

  const setPositionDraft = useSetAtom(positionDraftAtom);

  const containerRef = useRef<HTMLDivElement>(null);
  const hasPositionDraftRef = useRef<boolean>(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const element = event.target;

      if (element instanceof HTMLElement) {
        const draft = element.closest('.draft');
        if (draft) {
          return;
        }

        if (hasPositionDraftRef.current) {
          setPositionDraft(null);
          hasPositionDraftRef.current = false;
          return;
        }

        const hasValidAncestor = element.closest('.page-container');
        if (!hasValidAncestor) {
          return;
        }

        const xpath = getXPath(element);

        const rect = containerRef.current?.getBoundingClientRect();
        const x =
          event.clientX -
          (rect?.left || 0) +
          (containerRef.current?.offsetLeft || 0);
        const y =
          event.clientY -
          (rect?.top || 0) +
          (containerRef.current?.offsetTop || 0);

        setPositionDraft({ x, y, xpath });
        hasPositionDraftRef.current = true;

        setTimeout(() => {
          ReactEditor.focus(editor);
        });
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [editor, setPositionDraft]);

  const onReset = (): void => {
    hasPositionDraftRef.current = false;
  };

  return { editor, onReset };
};
