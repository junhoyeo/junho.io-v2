import styled from '@emotion/styled';
import { useTheme } from '@geist-ui/core';

import { Analytics } from '@/utils/analytics';

export const Header: React.FC = () => {
  const { palette } = useTheme();

  return (
    <Container>
      <Title style={{ color: palette.accents_7 }}>
        {`Hi, I'm `}
        <span>Junho Yeo</span>
      </Title>
      <Description style={{ color: palette.accents_6 }}>
        {`Welcome to my site. I'm a 19-yo generalist hacker, shaping the 2nd/3rd
          web. Sometimes a designer and dreamer, I just like to build things.
          Now I'm preparing the infrastructure—insight, followers, and
          capital—for a bigger dream.`}
      </Description>

      <ButtonList>
        <a
          href="https://github.com/junhoyeo"
          target="_blank"
          rel="noopener"
          onClick={() =>
            Analytics.logEvent('click_social_link', {
              name: 'GitHub',
              medium: 'home_header',
            })
          }
        >
          <Button>GITHUB</Button>
        </a>
        <a
          href="https://twitter.com/_junhoyeo"
          target="_blank"
          rel="noopener"
          onClick={() =>
            Analytics.logEvent('click_social_link', {
              name: 'Twitter',
              medium: 'home_header',
            })
          }
        >
          <Button>TWITTER</Button>
        </a>
      </ButtonList>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 28px;

  font-weight: 800;
  font-size: 2rem;
  line-height: 1.25;
  letter-spacing: -0.25px;
`;
const Description = styled.p`
  margin: 0;
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 18px;
  padding-bottom: 0.56rem;
  line-height: 1.45;
`;

const ButtonList = styled.div`
  display: flex;
  gap: 6px;
`;
const Button = styled.button`
  padding: 2px 8px;

  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  background-color: #e3e6ff;

  font-weight: 500;
  font-size: 14px;
  color: black;
  cursor: pointer;

  &:hover {
    opacity: 0.88;
  }
`;
