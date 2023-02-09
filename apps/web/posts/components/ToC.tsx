import styled from '@emotion/styled';

import { type Heading } from '../lib/rehype-extract-headings';

type ToCProps = {
  headings: Heading[];
};
export const ToC: React.FC<ToCProps> = ({ headings }) => {
  return (
    <Container>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          style={{ marginLeft: 16 * (heading.rank - 2) }}
        >
          {heading.title}
        </a>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 100;
  overflow-y: scroll;

  width: 240px;
  min-width: 240px;
`;
