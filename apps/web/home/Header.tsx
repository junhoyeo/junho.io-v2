import { Text, useTheme } from '@geist-ui/core';
import Image from 'next/future/image';

import shipIllust from '../assets/ship.png';

export const Header: React.FC = () => {
  const { palette } = useTheme();

  return (
    <div
      style={{
        height: '600px',
        position: 'relative',
        zIndex: 0,
        marginBottom: -64,
      }}
    >
      <Image
        alt=""
        sizes="100vw"
        src={shipIllust}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '420px',
          objectFit: 'cover',
          objectPosition: 'bottom center',
          filter: 'brightness(0.85)',
          userSelect: 'none',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'absolute',
          zIndex: 0,
          left: 0,
          right: 0,
          bottom: 48,
          paddingTop: 80,
          background: 'linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 70%)',
        }}
      >
        <Text
          h1
          style={{
            margin: 0,
            lineHeight: 1,
            fontSize: '84px',
            textAlign: 'center',
          }}
        >
          Paracøsm
        </Text>
        <Text
          h2
          style={{
            margin: 0,
            marginTop: 16,
            lineHeight: 1,
            textAlign: 'center',
            color: palette.accents_5,
          }}
        >
          Junho Yeø
        </Text>
      </div>
    </div>
  );
};
