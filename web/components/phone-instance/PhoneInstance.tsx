import styled from '@emotion/styled';
import { Phone, type PhoneProps } from '@junhoyeo/iphone';
import { type DynamicIslandProps } from '@junhoyeo/iphone/dist/dynamic-island/src/DynamicIsland';
import { Analytics } from '@/utils/analytics';
import { BACKGROUND_IMAGE_URL, DOCK } from './constants';
import { INSTALLED_APPS } from './constants/grid';

export type PhoneInstanceProps = Partial<PhoneProps> & {
  dynamicIslandProps: Omit<DynamicIslandProps, 'children'>;
  onClickDockedApp?: () => void;
};

export const PhoneInstance: React.FC<PhoneInstanceProps> = ({
  onClickDockedApp,
  ...props
}) => {
  return (
    <Container>
      <Phone
        backgroundImage={BACKGROUND_IMAGE_URL}
        {...props}
        appBarBrightness="dark"
        frameColor="purple"
        apps={INSTALLED_APPS.map((app) => ({
          ...app,
          onClick: () => {
            if (!app.id) {
              return;
            }
            Analytics.logEvent('click_icon', { name: app.name ?? 'Unknown' });
            const element = document.querySelector(`#${app.id}`);
            if (element) {
              const rect = element.getBoundingClientRect();
              const scrollTop = window.scrollY + rect.top - 64;
              window.scrollTo({
                top: scrollTop,
                behavior: 'smooth',
              });
            }
          },
        }))}
        dock={DOCK.map((app) => ({ ...app, onClick: onClickDockedApp }))}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  button {
    cursor: pointer;
    border: 0;
    outline: 0;
  }

  p {
    margin: 0;
  }
`;
