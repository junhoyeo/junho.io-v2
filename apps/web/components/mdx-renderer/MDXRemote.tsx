/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import * as mdx from '@mdx-js/react';
import { type MDXRemoteProps } from 'next-mdx-remote';
import React, { useEffect, useMemo, useState } from 'react';

// https://github.com/hashicorp/next-mdx-remote/blob/main/src/index.tsx
export const MDXRemote: React.FC<MDXRemoteProps> = ({
  compiledSource,
  frontmatter,
  scope,
  components = {},
  lazy,
  ...props
}) => {
  const [isReadyToRender, setIsReadyToRender] = useState(
    !lazy || typeof window === 'undefined',
  );

  useEffect(() => {
    if (lazy) {
      const handle = window.requestIdleCallback(() => {
        setIsReadyToRender(true);
      });
      return () => window.cancelIdleCallback(handle);
    }
  }, []);

  const Content = useMemo(() => {
    const fullScope = Object.assign(
      { opts: { ...mdx, ...require('react/jsx-runtime') } },
      { frontmatter },
      scope,
    );
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);

    const hydrateFn = Reflect.construct(
      Function,
      keys.concat(`${compiledSource}`),
    );
    const hydrated = hydrateFn.apply(hydrateFn, values);
    return hydrated.default;
  }, [frontmatter, scope, compiledSource]);

  if (!isReadyToRender) {
    return (
      <div dangerouslySetInnerHTML={{ __html: '' }} suppressHydrationWarning />
    );
  }

  const content = (
    <mdx.MDXProvider components={components}>
      <Content />
    </mdx.MDXProvider>
  );

  return lazy ? <div>{content}</div> : content;
};
