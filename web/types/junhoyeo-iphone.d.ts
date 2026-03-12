declare module '@junhoyeo/iphone' {
  import React, { FC, ReactNode, CSSProperties, Dispatch, SetStateAction } from 'react';

  export const DEVICE_WIDTH: number;
  export const DEVICE_HEIGHT: number;
  export const DEVICE_BUTTON_WIDTH: number;
  export const APP_ICON_SIZE: number;

  export type DynamicIslandSize = 'compact' | 'minimalLeading' | 'minimalTrailing' | 'default' | 'large' | 'long' | 'ultra';

  export type DeviceFrameColor = 'purple' | 'silver' | 'black' | 'gold';

  export type AppBarBrightness = 'light' | 'dark';

  export interface AppIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: string;
    color?: string;
    accessories?: ReactNode;
    children?: ReactNode;
  }

  export interface GridItemProps extends AppIconProps {
    id?: string;
    name?: string;
    notifications?: number;
    component?: ReactNode;
    dock?: boolean;
    onClick?: () => void;
  }

  export interface DynamicIslandProps {
    state: DynamicIslandSize;
    setState: Dispatch<SetStateAction<DynamicIslandSize>>;
    default: DynamicIslandSize;
    onHover?: () => void;
    onLeave?: () => void;
    onClick?: () => void;
    children?: ReactNode;
    id?: string;
  }

  export interface PhoneProps {
    appBarBrightness?: AppBarBrightness;
    frameColor?: DeviceFrameColor;
    apps?: GridItemProps[];
    dock?: GridItemProps[];
    backgroundImage?: string;
    dynamicIslandProps?: Omit<DynamicIslandProps, 'children'>;
    children?: ReactNode;
    transformScale?: number;
    style?: CSSProperties;
  }

  export const Phone: FC<PhoneProps>;
  export const AppIcon: FC<AppIconProps>;
  export const GridItem: FC<GridItemProps>;
}

declare module '@junhoyeo/iphone/dist/dynamic-island/src/DynamicIsland' {
  import { Dispatch, SetStateAction, ReactNode } from 'react';
  import { DynamicIslandSize } from '@junhoyeo/iphone';

  export interface DynamicIslandProps {
    state: DynamicIslandSize;
    setState: Dispatch<SetStateAction<DynamicIslandSize>>;
    default: DynamicIslandSize;
    onHover?: () => void;
    onLeave?: () => void;
    onClick?: () => void;
    children?: ReactNode;
    id?: string;
  }

  const DynamicIsland: (props: DynamicIslandProps) => JSX.Element;
  export default DynamicIsland;
}
