import styled from '@emotion/styled';
import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import React, { useMemo } from 'react';

import { useCodeWordWrap } from './useCodeWordWrap';

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const wordWrap = useCodeWordWrap();

  const language = /language-(?<lang>\w+)/.exec(props.className || '')?.[1] as
    | Language
    | undefined;

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

  return (
    <Container>
      <Highlight {...defaultProps} code={code.trim()} language={language}>
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
          <WordWrapButton
            isEnabled={wordWrap.isEnabled}
            onClick={() => wordWrap.toggle()}
          />
        ) : null}
        <CopyButton code={code} />
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div``;
const ButtonGroup = styled.div``;

const WordWrapButton: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { isEnabled: boolean }
> = ({ isEnabled: _isEnabled, ...props }) => (
  <button type="button" {...props}>
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"
        fill="currentColor"
      />
    </svg>
  </button>
);

const CopyButton: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { code: string }
> = ({ code: _code, ...props }) => (
  <button type="button" {...props}>
    <span aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
      </svg>
      <svg viewBox="0 0 24 24">
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
    </span>
  </button>
);
