import styled from '@emotion/styled';
import { Phone } from '@junhoyeo/iphone';
import { type DynamicIslandProps } from '@junhoyeo/iphone/dist/dynamic-island/src/DynamicIsland';

import { BACKGROUND_IMAGE_URL, DOCK } from './constants';

export type PhoneInstanceProps = {
  dynamicIslandProps: Omit<DynamicIslandProps, 'children'>;
};

export const PhoneInstance: React.FC<PhoneInstanceProps> = ({
  dynamicIslandProps,
}) => {
  return (
    <Container>
      <Phone
        appBarBrightness="dark"
        frameColor="purple"
        transformScale={0.85}
        apps={[]}
        dock={DOCK}
        // dock={DOCK.map((v) => ({ ...v, onClick: () => setHasApp(true) }))}
        backgroundImage={BACKGROUND_IMAGE_URL}
        dynamicIslandProps={dynamicIslandProps}
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
