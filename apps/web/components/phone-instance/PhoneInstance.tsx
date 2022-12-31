import styled from '@emotion/styled';
import { Phone, type PhoneProps } from '@junhoyeo/iphone';
import { type DynamicIslandProps } from '@junhoyeo/iphone/dist/dynamic-island/src/DynamicIsland';

import { BACKGROUND_IMAGE_URL, DOCK } from './constants';
import { INSTALLED_APPS } from './constants/grid';

export type PhoneInstanceProps = Partial<PhoneProps> & {
  dynamicIslandProps: Omit<DynamicIslandProps, 'children'>;
};

export const PhoneInstance: React.FC<PhoneInstanceProps> = ({ ...props }) => {
  return (
    <Container>
      <Phone
        backgroundImage={BACKGROUND_IMAGE_URL}
        {...props}
        appBarBrightness="dark"
        frameColor="purple"
        apps={INSTALLED_APPS}
        dock={DOCK}
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
    background-color: transparent;
  }
`;