import styled from '@emotion/styled';
import { useTheme } from '@geist-ui/core';

import { SocialButtonList } from '@/components/SocialButtonList';

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

      <SocialButtonList medium="home_header" />
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
