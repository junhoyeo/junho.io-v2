import styled from '@emotion/styled';
import { Text, useTheme } from '@geist-ui/core';
import Image from 'next/future/image';

import shipIllust from '../assets/ship.png';

export const Header: React.FC = () => {
  const { palette } = useTheme();

  return (
    <Container>
      <ShipIllust alt="" placeholder="blur" sizes="100vw" src={shipIllust} />
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
const ShipIllust = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 420px;

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
