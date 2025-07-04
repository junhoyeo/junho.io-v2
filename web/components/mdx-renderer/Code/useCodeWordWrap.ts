import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

import { useMutationObserver } from './useMutationObserver';

// Callback fires when the "hidden" attribute of a tabpanel changes
// See https://github.com/facebook/docusaurus/pull/7485
function useTabBecameVisibleCallback(
  codeBlockRef: RefObject<HTMLPreElement | null>,
  callback: () => void,
  skip = false,
): void {
  const [hiddenTabElement, setHiddenTabElement] = useState<
    Element | null | undefined
  >();

  const updateHiddenTabElement = useCallback(() => {
    // No need to observe non-hidden tabs
    // + we want to force a re-render when a tab becomes visible
    setHiddenTabElement(
      codeBlockRef.current?.closest('[role=tabpanel][hidden]'),
    );
  }, [codeBlockRef, setHiddenTabElement]);

  useEffect(() => {
    if (skip) {
      return;
    }
    updateHiddenTabElement();
  }, [skip, updateHiddenTabElement]);

  useMutationObserver(
    skip ? undefined : hiddenTabElement,
    (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'hidden'
        ) {
          callback();
          updateHiddenTabElement();
        }
      });
    },
    {
      attributes: true,
      characterData: false,
      childList: false,
      subtree: false,
    },
  );
}

type UseCodeWordWrapOptions = {
  skip?: boolean;
};
export function useCodeWordWrap({ skip = false }: UseCodeWordWrapOptions): {
  readonly codeBlockRef: RefObject<HTMLPreElement | null>;
  readonly isEnabled: boolean;
  readonly isCodeScrollable: boolean;
  readonly toggle: () => void;
} {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isCodeScrollable, setIsCodeScrollable] = useState<boolean>(false);
  const codeBlockRef = useRef<HTMLPreElement>(null);

  const toggle = useCallback(() => {
    const codeElement = codeBlockRef.current?.querySelector('code');

    if (codeElement) {
      if (isEnabled) {
        codeElement.removeAttribute('style');
      } else {
        codeElement.style.whiteSpace = 'pre-wrap';
        // When code wrap is enabled, we want to avoid a scrollbar in any case
        // Ensure that very very long words/strings/tokens still wrap
        codeElement.style.overflowWrap = 'anywhere';
      }
    }

    setIsEnabled((value) => !value);
  }, [codeBlockRef, isEnabled]);

  const updateCodeIsScrollable = useCallback(() => {
    const scrollWidth = codeBlockRef.current?.scrollWidth || 0;
    const clientWidth = codeBlockRef.current?.clientWidth || 0;
    const isScrollable = scrollWidth > clientWidth || false;
    setIsCodeScrollable(isScrollable);
  }, [codeBlockRef]);

  useTabBecameVisibleCallback(codeBlockRef, updateCodeIsScrollable, skip);

  useEffect(() => {
    if (skip) {
      return;
    }
    updateCodeIsScrollable();
  }, [skip, isEnabled, updateCodeIsScrollable]);

  useEffect(() => {
    if (skip) {
      return;
    }
    window.addEventListener('resize', updateCodeIsScrollable, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', updateCodeIsScrollable);
    };
  }, [skip, updateCodeIsScrollable]);

  return { codeBlockRef, isEnabled, isCodeScrollable, toggle };
}
