import styled from '@emotion/styled';
import { Text, useTheme } from '@geist-ui/core';
import Image from 'next/image';

import shipIllust from '../assets/ship.jpg';

export const Header: React.FC = () => {
  const { palette } = useTheme();

  return (
    <Container>
      <ShipIllustContainer>
        <ShipIllust alt="" placeholder="blur" sizes="100vw" src={shipIllust} />
      </ShipIllustContainer>
      <Content>
        <Title h1>Paracøsm</Title>
        <Subtitle h2 style={{ color: palette.accents_5 }}>
          Junho Yeø
        </Subtitle>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  margin-bottom: -64px;
  height: 600px;

  position: relative;
  z-index: 0;
`;
const ShipIllustContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-bottom: -10px;
`;
const ShipIllust = styled(Image)`
  width: 100%;
  min-width: 1400px;
  max-width: 1400px;
  height: 430px;

  object-fit: cover;
  object-position: bottom center;
  filter: brightness(0.85);
  user-select: none;
  -webkit-user-drag: none;
`;

const Content = styled.div`
  padding-top: 80px;

  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  bottom: 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 70%);
`;
const Title = styled(Text)`
  margin: 0;
  line-height: 1;
  font-size: 84px;
  text-align: center;
`;
const Subtitle = styled(Text)`
  margin: 0;
  margin-top: 16px;
  line-height: 1;
  text-align: center;
`;
