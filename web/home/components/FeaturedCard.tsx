import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image, { type StaticImageData } from 'next/image';

export type FeaturedCardProps = {
  badges?: string[];
  title: string;
  description?: string;
  image?: StaticImageData;
  dark?: boolean;
};
export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  badges,
  title,
  description,
  image,
  dark = false,
}) => {
  return (
    <Container dark={dark}>
      {image ? (
        <BackgroundImage alt="" src={image} width={500} height={300} />
      ) : null}
      <Title className="title">{title}</Title>
      {description ? (
        <Description className="description">{description}</Description>
      ) : null}

      {!!badges && badges.length > 0 ? (
        <BadgeList>
          {badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </BadgeList>
      ) : null}
    </Container>
  );
};

const Container = styled.div<{ dark: boolean }>`
  flex: 1;
  padding: 42px 32px 32px;

  border-radius: 16px;
  background: linear-gradient(to bottom, #33333a, #000);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  position: relative;
  z-index: 0;
  overflow: hidden;

  ${({ dark }) =>
    !dark
      ? css`
          .title {
            color: rgba(255, 255, 255, 0.65);
          }

          .description {
            color: rgba(255, 255, 255, 0.45);
          }
        `
      : css`
          .title {
            color: rgba(0, 0, 0, 0.9);
          }

          .description {
            color: rgba(0, 0, 0, 0.65);
          }
        `}
`;
const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  user-select: none;
  -webkit-user-drag: none;
`;
const BadgeList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Badge = styled.span`
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(235, 168, 255, 0.68);
  backdrop-filter: blur(4px);
  color: rgb(162, 31, 255);
  border: 2px solid rgba(162, 31, 255, 0.65);

  font-size: 0.85rem;
  font-weight: 500;
`;
const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  line-height: 1;
  font-weight: 800;
  text-align: center;
`;
const Description = styled.p`
  margin: 0;
  line-height: 1.45;
  font-weight: 600;
  letter-spacing: -0.65px;
  text-align: center;
`;
