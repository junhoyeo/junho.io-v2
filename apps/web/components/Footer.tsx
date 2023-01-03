import styled from '@emotion/styled';

export const Footer: React.FC = () => {
  return (
    <Container>
      <article>
        <a
          href="https://github.com/junhoyeo/paracosm"
          target="_blank"
          rel="noopener"
        >
          ©2023 @junhoyeo
        </a>
      </article>
    </Container>
  );
};

const Container = styled.footer`
  padding: 32px 0 140px;
  width: 100%;

  article {
    width: 100%;
    display: flex;
  }

  a {
    margin: 0 auto;
    width: fit-content;
    font-weight: 500;
    color: white;
  }
`;
