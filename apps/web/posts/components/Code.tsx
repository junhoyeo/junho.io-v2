import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import React, { useMemo } from 'react';

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const Code: React.FC<CodeProps> = ({ children, ...props }) => {
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
    <Highlight {...defaultProps} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
      )}
    </Highlight>
  );
};
