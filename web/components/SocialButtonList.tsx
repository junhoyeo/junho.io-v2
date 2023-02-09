import styled from '@emotion/styled';

import { Analytics } from '@/utils/analytics';

type SocialButtonListProps = React.HTMLAttributes<HTMLDivElement> & {
  medium?: string;
};
export const SocialButtonList: React.FC<SocialButtonListProps> = ({
  medium,
  ...props
}) => (
  <ButtonList {...props}>
    <a
      href="https://github.com/junhoyeo"
      target="_blank"
      rel="noopener"
      onClick={() =>
        Analytics.logEvent('click_social_link', {
          name: 'GitHub',
          medium,
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
          medium,
        })
      }
    >
      <Button>TWITTER</Button>
    </a>
  </ButtonList>
);

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
