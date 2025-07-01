import styled from '@emotion/styled';
import {
  Copy as CopyIcon,
  CornerDownLeft as CornerDownLeftIcon,
} from '@geist-ui/icons';
import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import React, { useMemo } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { colors } from '@/styles/colors';
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

  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!language) return <code {...props}>{code}</code>;

  return (
    <Container>
      <Highlight
        {...defaultProps}
        code={code.trim()}
        language={language}
        theme={theme}
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
      <TopRow>
        <LanguageLabel>{language}</LanguageLabel>

        <ButtonGroup>
          {wordWrap.isEnabled || wordWrap.isCodeScrollable ? (
            <IconButton onClick={() => wordWrap.toggle()}>
              <CornerDownLeftIcon size={16} />
            </IconButton>
          ) : null}
          <IconButton onClick={() => copyToClipboard(code)}>
            <CopyIcon size={16} />
          </IconButton>
        </ButtonGroup>
      </TopRow>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 48px 16px 20px;
  border-radius: 8px;
  background-color: ${theme.plain.backgroundColor};

  pre {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

const TopRow = styled.div`
  width: 100%;
  padding-right: 8px;
  padding-left: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const LanguageLabel = styled.code`
  color: ${colors.accents_5};
  font-size: 12px;
`;

const IconButton = styled.button`
  padding: 6px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: ${colors.accents_6};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.plain.backgroundColor};
    color: ${colors.accents_8};
  }
`;
