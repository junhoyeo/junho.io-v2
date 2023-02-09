import styled from '@emotion/styled';

import { type Heading } from '../lib/rehype-extract-headings';

type ToCProps = {
  headings: Heading[];
};
export const ToC: React.FC<ToCProps> = ({ headings }) => {
  return (
    <Container>
      {headings.map((heading) => (
        <a href={`#${heading.id}`}>{heading.title}</a>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
