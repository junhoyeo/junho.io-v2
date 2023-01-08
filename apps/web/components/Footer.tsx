import styled from '@emotion/styled';

import { Analytics } from '@/utils/analytics';

export const Footer: React.FC = () => {
  return (
    <Container>
      <article>
        <a
          href="https://github.com/junhoyeo/paracosm"
          target="_blank"
          rel="noopener"
          onClick={() =>
            Analytics.logEvent('click_social_link', {
              name: 'GitHub',
              medium: 'home_footer',
            })
          }
        >
          ©2023 @junhoyeo
        </a>
      </article>
      <FixedGradient />
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

const FixedGradient = styled.div`
  width: 100%;
  height: 78px;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 1) 100%
  );
`;
