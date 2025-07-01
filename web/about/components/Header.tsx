import styled from '@emotion/styled';
import { SocialButtonList } from '@/components/SocialButtonList';
import { colors } from '@/styles/colors';

export const Header: React.FC = () => {
  return (
    <Container>
      <Title>
        {`Hi, I'm `}
        <span>Junho Yeo</span>
      </Title>
      <Description>
        {`Welcome to my site. I'm a 20-yo generalist hacker, shaping the 2nd/3rd
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
  color: ${colors.accents_7};
`;
const Description = styled.p`
  margin: 0;
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 18px;
  padding-bottom: 0.56rem;
  line-height: 1.45;
  color: ${colors.accents_6};
`;
