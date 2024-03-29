import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image, { type StaticImageData } from 'next/image';

import flagKoEmoji from '../assets/flag-ko.png';
import flagUsEmoji from '../assets/flag-us.png';

export type FeaturedCardProps = {
  badges?: string[];
  title: string;
  description?: string;
  image?: StaticImageData;
  dark?: boolean;
  language?: 'en' | 'ko';
};
export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  badges,
  title,
  description,
  image,
  dark = false,
  language,
}) => {
  return (
    <Container dark={dark}>
      {image ? (
        <BackgroundImage
          className="bg"
          alt=""
          src={image}
          width={500}
          height={300}
        />
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

      {language === 'ko' ? (
        <AbsoluteEmoji alt="ko" src={flagKoEmoji} width={120} height={120} />
      ) : null}
      {language === 'en' ? (
        <AbsoluteEmoji alt="en" src={flagUsEmoji} width={120} height={120} />
      ) : null}
    </Container>
  );
};

const Container = styled.div<{ dark: boolean }>`
  flex: 1;
  padding: 52px 32px 42px;

  border-radius: 16px;
  background: linear-gradient(to bottom, #33333a, #000);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

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

  &, *:not(img), img.bg {
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    transform: translate3d(0, -16px, 0);

    *:not(img, span) {
      transform: translate3d(0, -6px, 0) scale(1.05);
    }

    img.bg {
      filter: saturate(120%);
    }

    span {
      transform: scale(1.05);
    }
  }
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
  margin-top: 4px;
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

  width: fit-content;
  max-width: 540px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const AbsoluteEmoji = styled(Image)`
  width: 32px;
  height: 32px;

  position: absolute;
  top: 10px;
  left: 12px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));

  user-select: none;
  -webkit-user-drag: none;
`;
