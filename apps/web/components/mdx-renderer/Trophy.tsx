import styled from '@emotion/styled';
import Image from 'next/image';

type TrophyProps = {
  contest: string;
  award: string;
  style?: React.CSSProperties;
};
export const Trophy: React.FC<TrophyProps> = ({ contest, award, style }) => {
  return (
    <Container>
      <TrophyImage
        src="/assets/trophy.png"
        alt="Trophy"
        width={96}
        height={96}
      />
      <Content>
        <ContestBadge style={style}>{contest}</ContestBadge>
        <Award>{award}</Award>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px 20px;
  padding-left: 10px;
  border-radius: 8px;
  background-color: rgba(84, 86, 117, 0.4);
  border: 1px solid rgba(84, 86, 117, 0.66);

  display: flex;
  align-items: center;
  gap: 2px;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;
const TrophyImage = styled(Image)`
  width: 32px;
  height: 32px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ContestBadge = styled.span`
  min-width: fit-content;
  padding: 6px 10px;
  border-radius: 32px;
  font-size: 12px;
  font-weight: bold;
  background-color: #5a5c7c;
`;
const Award = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
`;
