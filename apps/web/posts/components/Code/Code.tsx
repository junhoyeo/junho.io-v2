import styled from '@emotion/styled';
import { Button } from '@geist-ui/core';
import {
  Copy as CopyIcon,
  CornerDownLeft as CornerDownLeftIcon,
} from '@geist-ui/icons';
import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import React, { useMemo } from 'react';

import { copyToClipboard } from '../../../utils/clipboard';
import { theme } from './theme';
import { useCodeWordWrap } from './useCodeWordWrap';

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const language = /language-(?<lang>\w+)/.exec(props.className || '')?.[1] as
    | Language
    | undefined;
  const wordWrap = useCodeWordWrap({ skip: !language });

  const code = children?.toString() || '';

  // TODO: Highlight Support
  const highlight: string | undefined = '';

  const highlightedLines = useMemo(
    () =>
      highlight
        ? highlight.split(',').reduce<number[]>((lines, h) => {
            if (h.includes('-')) {
              // Expand ranges like 3-5 into [3,4,5]
              const [start = 0, end = 0] = h.split('-').map(Number);
              const x = Array(end - start + 1)
                .fill(undefined)
                .map((_, i) => i + start);
              return [...lines, ...x];
            }

            return [...lines, Number(h)];
          }, [])
        : [],
    [highlight],
  );

  if (!language) return <code {...props}>{code}</code>;

  console.log(code, wordWrap);

  return (
    <Container>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={wordWrap.codeBlockRef}
            /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
            tabIndex={0}
          >
            <code className={className} style={{ ...style }}>
              {tokens.map((line, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  {...getLineProps({ line, key: index })}
                  style={
                    highlightedLines.includes(index + 1)
                      ? {
                          // TODO: Check highlight color
                          background: 'var(--highlight)',
                          margin: '0 -1rem',
                          padding: '0 1rem',
                        }
                      : undefined
                  }
                >
                  {line.map((token, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      <ButtonGroup>
        {wordWrap.isEnabled || wordWrap.isCodeScrollable ? (
          <Button
            auto
            iconRight={<CornerDownLeftIcon />}
            onClick={() => wordWrap.toggle()}
            px={0.6}
          />
        ) : null}
        <Button
          auto
          iconRight={<CopyIcon />}
          onClick={() => copyToClipboard(code)}
          px={0.6}
        />
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div``;
const ButtonGroup = styled.div``;
