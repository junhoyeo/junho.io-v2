import { css, type SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { Text, useScale, useTheme } from '@geist-ui/core';

const negativeToCalc = (calcString: string): string =>
  calcString.replace('(', '(-');

export const Header: React.FC = () => {
  const { palette } = useTheme();

  const { SCALES } = useScale();

  return (
    <Container pl={SCALES.pl(1.34)} pr={SCALES.pr(1.34)}>
      <Content>
        <Title h1>Paracøsm</Title>
        <Subtitle h2 style={{ color: palette.accents_5 }}>
          Junho Yeø
        </Subtitle>
      </Content>
    </Container>
  );
};

const Container = styled.header<{ pl: string; pr: string }>`
  position: relative;
  z-index: 0;

  ${({ pl, pr }): SerializedStyles => css`
    @media screen and (max-width: 1200px) {
      margin-left: ${negativeToCalc(pl)};
      margin-right: ${negativeToCalc(pr)};
    }

    @media screen and (max-width: 982px) {
      width: 100vw;
    }
  `}
`;

const Content = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 70%);
`;
const Title = styled(Text)`
  margin: 0;
  font-size: 52px;
  line-height: 1;
  text-align: center;
`;
const Subtitle = styled(Text)`
  margin: 0;
  margin-top: 12px;

  font-size: 24px;
  line-height: 1;
  text-align: center;
`;
